// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
//const mysql = require('mysql')
const fs = require('fs')
const child_process = require("child_process")
const ipc = ipcMain
const ps_script_path = "./query_users.ps1"
var user_list = []
var user_list_historical

function read_user_list_file(is_new=false){
  fs.readFile("./user_list.json", "utf8", (err, data) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    if (is_new){user_list = JSON.parse(data)}
    else{user_list_historical = JSON.parse(data)}
    return
  })
}

function query_sql() {
  var spawn = child_process.spawn,child;
  child = spawn("powershell.exe",[ps_script_path]);
  child.stdout.on("data",function(data){console.log("Powershell Data: " + data.toString("utf-8"))})
  child.stderr.on("data",function(data){console.log("Powershell Errors: " + data)})
  child.on("exit",function(){
    read_user_list_file(true)
    console.log("Powershell Script finished")
  })
  child.stdin.end();
}

read_user_list_file()
query_sql()

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

  // get AD list
  ipc.on('get_AD_list', (event,value)=>{ 
    value = value.toLowerCase()
    if(user_list.length === 0){
      results = user_list_historical
    } else { results = user_list }
    list = []
    for (const x of results) {
      if (x.startsWith(value)) {list.push(x)}
    }
    event.sender.send('AD-reply', list)
  }) 

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

