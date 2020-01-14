const { app, BrowserWindow } = require('electron')

function createWindow() {
  // Create the browser window.
  let win = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.maximize()

  // and load the index.html of the app.
  win.loadFile('index.html')
}
app.on('ready', createWindow)
