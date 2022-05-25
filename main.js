// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const ipc = ipcMain


function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 680,
    minWidth: 940,
    minHeight: 560,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devtools: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')
  mainWindow.setBackgroundColor('#343B48')

  //// BUTTONS FOR min max close
  // minimize app
  ipc.on('minimizeApp', ()=>{ 
    mainWindow.minimize()
  }) 

  // maximize app
  ipc.on('maximizeApp', ()=>{ 
    if(mainWindow.isMaximized()){ 
      mainWindow.restore() 
    } else { 
      mainWindow.maximize() 
    }
  }) 

  // close app
  ipc.on('closeApp', ()=>{ 
    mainWindow.close()
  }) 

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
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

