import { Holding, useHoldingsStore } from "@/store/holdings.store";
import { Security, useSecurityListStore } from "@/store/security-list.store";
import { readFile } from "./file.service";

export const initApp = () => {
  const securityListStore = useSecurityListStore();
  const securityList = readFile<Security[]>("security-list");
  securityListStore.setSecurityList(securityList);

  const holdingsStore = useHoldingsStore();
  const holdings = readFile<Holding[]>("holdings");
  holdingsStore.setHoldings(holdings);
};
