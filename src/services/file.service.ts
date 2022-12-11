import { useSetttingsStore } from "@/store/settings.store";
import fs from "fs";

export const readFile = <T>(fileName: string): T => {
  const settingsStore = useSetttingsStore();
  const fullFileName = `${settingsStore.databaseFolder}/${fileName}.data.json`;

  return JSON.parse(fs.readFileSync(fullFileName).toString()) as T;
};

export const writeFile = <T>(fileName: string, content: any) => {
  const settingsStore = useSetttingsStore();
  const fullFileName = `${settingsStore.databaseFolder}/${fileName}.data.json`;

  fs.writeFileSync(fullFileName, JSON.stringify(content, null, 4));
};

