const { ipcRenderer } = require('electron') 
const ipc = ipcRenderer 
const mySidebar = document.getElementById('mySidebar')
const showHideMenus = document.getElementById('showHideMenus')
const username_input = document.getElementById("username_input")
const autocomplete_div = document.getElementById("autocomplete-div")
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

function clear_autocomplete(){
    if(autocomplete_div.hasChildNodes){autocomplete_div.innerHTML=""}
}

function close_autocomplete(){
    if(!autocomplete_div.classList.contains('invisible')){autocomplete_div.classList.add('invisible')}
}

function show_autocomplete(response,len){
    if(autocomplete_div.classList.contains('invisible')){autocomplete_div.classList.remove('invisible')}
    clear_autocomplete()
    for (var f of response) {
        var new_sub_div = document.createElement('DIV')
        new_sub_div.innerHTML = `<strong>${f.slice(0,len)}</strong>${f.slice(len)}`
        autocomplete_div.appendChild(new_sub_div)
    }
}

function typed(text_input){
    var len = text_input.value.length
    if (len == 0){close_autocomplete()}
    else {
        ipc.send('get_AD_list',text_input.value)
        ipc.once('AD-reply', (event,response) => {show_autocomplete(response,len)})
    }
}