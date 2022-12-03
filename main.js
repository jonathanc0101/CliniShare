const axios = require("axios");

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

app.commandLine.appendSwitch("ignore-certificate-errors");

const createWindow = () => {
  const win = new BrowserWindow({ show: false });
  win.maximize();
  win.show();

  win.loadURL("https://localhost:5000");
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
