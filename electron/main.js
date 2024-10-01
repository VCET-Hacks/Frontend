import {app, BrowserWindow} from "electron"
import path from "path"
import isDev from "electron-is-dev"

function createWindow() {
const win = new BrowserWindow({
width: 1100,
height: 700,
webPreferences: {
nodeIntegration: true,
contextIsolation: false,
}
})

win.loadURL(
isDev
? 'http://localhost:5173'
: `file://${path.join(__dirname, '../dist/index.html')}`
)

if (isDev) {
win.webContents.openDevTools()
}
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
if (process.platform !== 'darwin') {
app.quit()
}
})

app.on('activate', () => {
if (BrowserWindow.getAllWindows().length === 0) {
createWindow()
}
})