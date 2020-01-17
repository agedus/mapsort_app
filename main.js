const { app, BrowserWindow } = require('electron');

function createWindow() {
  // Create the browser window
  let win = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // load custom settings and HTML
  // win.maximize();
  win.loadFile('index.html');

};
app.on('ready', createWindow);
