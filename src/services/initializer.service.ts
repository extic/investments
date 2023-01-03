import { Portfolio, usePortfolioStore } from "@/store/portfolio.store";
import { useSecurityListStore } from "@/store/security-list.store";
import { useWatchlistStore } from "@/store/watchlist.store";
import { Security } from "@/types/types";
import { readFile } from "./file.service";

export const initApp = () => {
  const securityListStore = useSecurityListStore();
  const securityList = readFile<Security[]>("security-list");
  securityListStore.setList(securityList);

  const portfolioStore = usePortfolioStore();
  const portfolio = readFile<Portfolio>("portfolio");
  portfolioStore.setPortfolio(portfolio);

  const watchlistStore = useWatchlistStore();
  const watchlist = readFile<string[]>("watchlist");
  watchlistStore.setItems(watchlist);
};
