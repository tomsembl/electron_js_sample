const { ipcRenderer } = require('electron') 
const ipc = ipcRenderer 
const mySidebar = document.getElementById('mySidebar')
const showHideMenus = document.getElementById('showHideMenus')
const username_input = document.getElementById("username_input")
var isSideMenuActive = true

//// BUTTONS FOR min max close    
//minimize app
minimizeBtn.addEventListener('click', ()=>{ 
    ipc.send('minimizeApp') 
}) 

//maximize app
maximizeBtn.addEventListener('click', ()=>{ 
    ipc.send('maximizeApp') 
}) 

//close app
closeBtn.addEventListener('click', ()=>{ 
    ipc.send('closeApp') 
}) 

//// TOGGLE MENU
// Expand and Retract

showHideMenus.addEventListener('click', ()=> {
    if(isSideMenuActive){
      mySidebar.style.width = '0px'
      isSideMenuActive = false
    } else {
      mySidebar.style.width = '280px'
      isSideMenuActive = true
    }
  })