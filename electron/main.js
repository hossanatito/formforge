const { app, BrowserWindow, ipcMain, dialog, protocol } = require('electron');
const path = require('path');
const fs = require('fs');
const url = require('url');

let store = null;
let mainWindow = null;

// Dynamic import for ESM-only electron-store
async function initStore() {
    const Store = (await import('electron-store')).default;
    store = new Store();
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
        const urlPath = request.url.replace('app://.', '');
        const decodedPath = decodeURIComponent(urlPath);
        const filePath = path.join(__dirname, '../out', decodedPath);
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

// IPC Handlers for form operations
ipcMain.handle('form:create', async (event, config) => {
    const forms = store.get('forms', []);
    forms.push(config);
    store.set('forms', forms);
    return config;
});

ipcMain.handle('form:getAll', async () => {
    return store.get('forms', []);
});

ipcMain.handle('form:get', async (event, id) => {
    const forms = store.get('forms', []);
    return forms.find(f => f.id === id);
});

ipcMain.handle('form:update', async (event, id, config) => {
    const forms = store.get('forms', []);
    const index = forms.findIndex(f => f.id === id);
    if (index !== -1) {
        forms[index] = { ...forms[index], ...config };
        store.set('forms', forms);
        return forms[index];
    }
    return null;
});

ipcMain.handle('form:delete', async (event, id) => {
    const forms = store.get('forms', []);
    const filtered = forms.filter(f => f.id !== id);
    store.set('forms', filtered);
    return true;
});

ipcMain.handle('form:export', async (event, id, phpContent) => {
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
