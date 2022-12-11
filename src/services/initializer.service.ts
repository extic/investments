import { PortfolioItem, usePortfolioStore } from "@/store/portfolio.store";
import { Security, useSecurityListStore } from "@/store/security-list.store";
import { readFile } from "./file.service";

export const initApp = () => {
  const securityListStore = useSecurityListStore();
  const securityList = readFile<Security[]>("security-list");
  securityListStore.setSecurityList(securityList);

  const holdingsStore = usePortfolioStore();
  const holdings = readFile<PortfolioItem[]>("holdings");
  holdingsStore.setItems(holdings);
};
