// Modules to control application life and create native browser window
const {app, BrowserWindow ,autoUpdater , dialog} = require('electron')
const path = require('path')
const log = require('electron-log');
log.transports.file.file = path.join(__dirname, 'log.log');



function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
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

  initUpdates()
}).catch(error=>{
  log.info('whenReady', JSON.stringify(error))
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



function initUpdates(){
  if (require('electron-squirrel-startup')) return;
  autoUpdater.setFeedURL('http://192.168.30.111:7430/upload/electron');

  autoUpdater.on('checking-for-update', () => {
    log.info('checking-for-update')
  });

  autoUpdater.on('update-available', () => {
    log.info('update-available')
  });

  autoUpdater.on('update-not-available', () => {
    log.info('update-not-available')
  });

  autoUpdater.on('update-downloaded', () => {
    log.info('update-downloaded')
    dialog.showMessageBox({type:'warning' ,title:'软件更新' ,message:'新版本已下载，是否确定更新？' , buttons:['取消','确定']})
    .then(idx=>{
      if(idx.response == 1){
        autoUpdater.quitAndInstall();
      }
    })
    
  });

    let squirrelEvent = process.argv[1];
    log.info('squirrelEvent',squirrelEvent)
    if (squirrelEvent !== '--squirrel-firstrun'){
      autoUpdater.checkForUpdates()
      log.info('not-squirrel-firstrun')
    }  
    else{
      log.info('squirrel-firstrun')
    }
}





// // this should be placed at top of main.js to handle setup events quickly
// if (handleSquirrelEvent()) {
//   // squirrel event handled and app will exit in 1000ms, so don't do anything else
//   return;
// }

// function handleSquirrelEvent() {
//   if (process.argv.length === 1) {
//     return false;
//   }

//   const ChildProcess = require('child_process');


//   const appFolder = path.resolve(process.execPath, '..');
//   const rootAtomFolder = path.resolve(appFolder, '..');
//   const updateDotExe = path.resolve(path.join(rootAtomFolder, 'Update.exe'));
//   const exeName = path.basename(process.execPath);

//   const spawn = function(command, args) {
//     let spawnedProcess, error;

//     try {
//       spawnedProcess = ChildProcess.spawn(command, args, {detached: true});
//     } catch (error) {}

//     return spawnedProcess;
//   };

//   const spawnUpdate = function(args) {
//     return spawn(updateDotExe, args);
//   };

//   const squirrelEvent = process.argv[1];
//   switch (squirrelEvent) {
//     case '--squirrel-install':
//     case '--squirrel-updated':
//       // Optionally do things such as:
//       // - Add your .exe to the PATH
//       // - Write to the registry for things like file associations and
//       //   explorer context menus

//       // Install desktop and start menu shortcuts
//       spawnUpdate(['--createShortcut', exeName]);

//       setTimeout(app.quit, 1000);
//       return true;

//     case '--squirrel-uninstall':
//       // Undo anything you did in the --squirrel-install and
//       // --squirrel-updated handlers

//       // Remove desktop and start menu shortcuts
//       spawnUpdate(['--removeShortcut', exeName]);

//       setTimeout(app.quit, 1000);
//       return true;

//     case '--squirrel-obsolete':
//       // This is called on the outgoing version of your app before
//       // we update to the new version - it's the opposite of
//       // --squirrel-updated

//       app.quit();
//       return true;
//   }
// };