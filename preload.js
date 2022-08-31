const { contextBridge } = require('electron')


const replaceText = (selector, text) => {
  const element = document.getElementById(selector)
  if (element) element.innerText = text
}

window.addEventListener('DOMContentLoaded', () => {
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})


contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
  ping: () => ipcRenderer.invoke('ping'),
})


contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {
    replaceText("test","testSucceded")
  }
})