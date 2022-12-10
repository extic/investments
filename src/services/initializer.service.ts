import { Holding, useHoldingsStore } from "@/store/holdings.store";
import { Security, useSecurityListStore } from "@/store/security-list.store";
import { useSetttingsStore } from "@/store/settings.store";
import fs from "fs";

export const initApp = () => {
  const securityListStore = useSecurityListStore();
  const securityList = readFile<Security[]>("security-list");
  securityListStore.setSecurityList(securityList);

  const holdingsStore = useHoldingsStore();
  const holdings = readFile<Holding[]>("holdings");
  holdingsStore.setHoldings(holdings);
};

const readFile = <T>(fileName: string): T => {
  const settingsStore = useSetttingsStore();
  const fullFileName = `${settingsStore.databaseFolder}/${fileName}.data.json`;

  return JSON.parse(fs.readFileSync(fullFileName).toString()) as T;
};
