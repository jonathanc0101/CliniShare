const axios = require('axios');

const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')

app.commandLine.appendSwitch('ignore-certificate-errors')


const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  
  win.loadURL("https://localhost:5000");
}

 

app.whenReady().then(() => {
  createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
