import t, { app as n, BrowserWindow as i } from "electron";
import a from "path";
if (typeof t == "string")
  throw new TypeError("Not running in an Electron environment!");
const { env: r } = process, c = "ELECTRON_IS_DEV" in r, l = Number.parseInt(r.ELECTRON_IS_DEV, 10) === 1, o = c ? l : !t.app.isPackaged;
function s() {
  const e = new i({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: !0,
      contextIsolation: !1
    }
  });
  e.loadURL(
    o ? "http://localhost:5173" : `file://${a.join(__dirname, "../dist/index.html")}`
  ), o && e.webContents.openDevTools();
}
n.whenReady().then(s);
n.on("window-all-closed", () => {
  process.platform !== "darwin" && n.quit();
});
n.on("activate", () => {
  i.getAllWindows().length === 0 && s();
});
