const axios = require('axios');

const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

const { fork } = require("child_process");

const child = fork("./database-clinishare/src/main.js");

child.on("close", function (code) {
  console.log("child process exited with code " + code);
});

process.on('exit', function() {
  child.kill();
});


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  
  win.loadFile('index.html') 
}

 

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

axios
.get('http://localhost:3000/medicos')
.then(res => {
  // console.log(`statusCode: ${res.status}`);
  console.log(res);
})
.catch(error => {
  console.error(error);
});
