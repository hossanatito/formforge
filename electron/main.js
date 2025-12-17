const { app, BrowserWindow, ipcMain, dialog, protocol } = require('electron');
const path = require('path');
const fs = require('fs');

let store = null;
let mainWindow = null;
let storeReady = false;

// Dynamic import for ESM-only electron-store
async function initStore() {
    try {
        const Store = (await import('electron-store')).default;
        store = new Store();
        storeReady = true;
        console.log('Store initialized successfully');
    } catch (error) {
        console.error('Failed to initialize store:', error);
        // Fallback: use in-memory storage
        store = {
            data: { forms: [] },
            get: function (key, def) { return this.data[key] || def; },
            set: function (key, val) { this.data[key] = val; }
        };
        storeReady = true;
    }
}

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        minWidth: 1200,
        minHeight: 700,
        icon: path.join(__dirname, '../public/icons/icon.ico'),
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        },
        titleBarStyle: 'hidden',
        frame: false,
        backgroundColor: '#0a0a0a'
    });

    // Load Next.js app
    const isDev = !app.isPackaged;
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        // Use custom protocol for production
        mainWindow.loadURL('app://./index.html');
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// Register custom protocol for serving static files
function registerProtocol() {
    protocol.registerFileProtocol('app', (request, callback) => {
        let urlPath = request.url.replace('app://.', '');
        urlPath = decodeURIComponent(urlPath);

        // Remove query string and hash
        urlPath = urlPath.split('?')[0].split('#')[0];

        let filePath = path.join(__dirname, '../out', urlPath);

        // If path doesn't have extension, try to find HTML file
        if (!path.extname(filePath)) {
            // Check for directory with index.html
            const indexPath = path.join(filePath, 'index.html');
            if (fs.existsSync(indexPath)) {
                filePath = indexPath;
            } else {
                // Try adding .html extension
                const htmlPath = filePath + '.html';
                if (fs.existsSync(htmlPath)) {
                    filePath = htmlPath;
                }
            }
        }

        callback({ path: filePath });
    });
}

app.whenReady().then(async () => {
    registerProtocol();
    await initStore();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});

// Helper to ensure store is ready
function getStore() {
    if (!store) {
        return {
            get: (key, def) => def,
            set: () => { }
        };
    }
    return store;
}

// IPC Handlers for form operations
ipcMain.handle('form:create', async (event, config) => {
    try {
        const s = getStore();
        const forms = s.get('forms', []);
        forms.push(config);
        s.set('forms', forms);
        return config;
    } catch (error) {
        console.error('Error creating form:', error);
        return null;
    }
});

ipcMain.handle('form:getAll', async () => {
    try {
        const s = getStore();
        return s.get('forms', []);
    } catch (error) {
        console.error('Error getting forms:', error);
        return [];
    }
});

ipcMain.handle('form:get', async (event, id) => {
    try {
        const s = getStore();
        const forms = s.get('forms', []);
        return forms.find(f => f.id === id);
    } catch (error) {
        console.error('Error getting form:', error);
        return null;
    }
});

ipcMain.handle('form:update', async (event, id, config) => {
    try {
        const s = getStore();
        const forms = s.get('forms', []);
        const index = forms.findIndex(f => f.id === id);
        if (index !== -1) {
            forms[index] = { ...forms[index], ...config };
            s.set('forms', forms);
            return forms[index];
        }
        return null;
    } catch (error) {
        console.error('Error updating form:', error);
        return null;
    }
});

ipcMain.handle('form:delete', async (event, id) => {
    try {
        const s = getStore();
        const forms = s.get('forms', []);
        const filtered = forms.filter(f => f.id !== id);
        s.set('forms', filtered);
        return true;
    } catch (error) {
        console.error('Error deleting form:', error);
        return false;
    }
});

ipcMain.handle('form:export', async (event, id, phpContent) => {
    try {
        const result = await dialog.showSaveDialog(mainWindow, {
            title: 'Export PHP Form',
            defaultPath: 'form.php',
            filters: [{ name: 'PHP Files', extensions: ['php'] }]
        });

        if (!result.canceled && result.filePath) {
            fs.writeFileSync(result.filePath, phpContent, 'utf-8');
            return { success: true, path: result.filePath };
        }
        return { success: false };
    } catch (error) {
        console.error('Error exporting form:', error);
        return { success: false };
    }
});

// Window control handlers
ipcMain.handle('window:minimize', () => mainWindow?.minimize());
ipcMain.handle('window:maximize', () => {
    if (mainWindow?.isMaximized()) {
        mainWindow.unmaximize();
    } else {
        mainWindow?.maximize();
    }
});
ipcMain.handle('window:close', () => mainWindow?.close());
ipcMain.handle('window:isMaximized', () => mainWindow?.isMaximized());
