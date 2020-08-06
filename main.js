// Modules to control application life and create native browser window
const {app, BrowserWindow  , dialog} = require('electron')
const path = require('path')
// const log = require('electron-log');
const { autoUpdater } = require('electron-updater');
// log.transports.file.file = path.join(__dirname, 'log.log');

// autoUpdater.logger = log;
// autoUpdater.logger.transports.file.level = 'info';
let mainWindow
function sendStatusToWindow(text) {

  mainWindow.webContents.send('message', text);
}
function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration:true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
  
  // Open the DevTools.
  mainWindow.webContents.openDevTools()
  
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
  setTimeout(() => {
    autoUpdater.checkForUpdatesAndNotify();
  }, 2000);
 
  
}).catch(error=>{
  // log.info('whenReady', JSON.stringify(error))
  console.error(error)
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
})
autoUpdater.on('update-available', (ev, info) => {
  sendStatusToWindow('Update available.'+ JSON.stringify(ev) + '--'+ JSON.stringify(info));
})
autoUpdater.on('update-not-available', (ev, info) => {
  sendStatusToWindow('Update not available.'+ JSON.stringify(ev) + '--'+ JSON.stringify(info));
})
autoUpdater.on('error', (ev, err) => {
  sendStatusToWindow('Error in auto-updater.'+ JSON.stringify(ev) + '--'+ JSON.stringify(err));
})
autoUpdater.on('download-progress', (ev, progressObj) => {
  sendStatusToWindow('Download progress...'+ JSON.stringify(ev));
})
autoUpdater.on('update-downloaded', (ev, info) => {
  sendStatusToWindow('Update downloaded; will install in 5 seconds'+ JSON.stringify(ev)+ '--'+ JSON.stringify(info));
});

