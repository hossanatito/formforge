const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Form operations
    createForm: (config) => ipcRenderer.invoke('form:create', config),
    getAllForms: () => ipcRenderer.invoke('form:getAll'),
    getForm: (id) => ipcRenderer.invoke('form:get', id),
    updateForm: (id, config) => ipcRenderer.invoke('form:update', id, config),
    deleteForm: (id) => ipcRenderer.invoke('form:delete', id),
    exportForm: (id, phpContent) => ipcRenderer.invoke('form:export', id, phpContent),

    // Window controls
    minimize: () => ipcRenderer.invoke('window:minimize'),
    maximize: () => ipcRenderer.invoke('window:maximize'),
    close: () => ipcRenderer.invoke('window:close'),
    isMaximized: () => ipcRenderer.invoke('window:isMaximized')
});
