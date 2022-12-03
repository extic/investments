import { App, BrowserWindow, ipcMain } from "electron";
import { handleHttpRequest } from "./http-request.service";

export const eventRegistrar = {
  registerEvents: async (win: BrowserWindow, app: App) => {
    ipcMain.handle('http:request', handleHttpRequest);
  },
};
