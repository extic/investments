import { useSettingsStore } from "@/store/settings.store";
import fs from "fs";

export const readFile = <T>(fileName: string): T => {
  const settingsStore = useSettingsStore();
  const fullFileName = `${settingsStore.databaseFolder}/${fileName}.json`;

  return JSON.parse(fs.readFileSync(fullFileName).toString()) as T;
};

export const writeFile = <T>(fileName: string, content: T) => {
  const settingsStore = useSettingsStore();
  const fullFileName = `${settingsStore.databaseFolder}/${fileName}.json`;

  fs.writeFileSync(fullFileName, JSON.stringify(content, null, 4));
};

export const isFolderExists = (folder: string) => {
  const settingsStore = useSettingsStore();
  return fs.existsSync(`${settingsStore.databaseFolder}/${folder}`);
}

export const createFolder = (folder: string) => {
  const settingsStore = useSettingsStore();
  return fs.mkdirSync(`${settingsStore.databaseFolder}/${folder}`, { recursive: true });
}

