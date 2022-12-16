import { PortfolioItem, usePortfolioStore } from "@/store/portfolio.store";
import { SecurityListItem, useSecurityListStore } from "@/store/security-list.store";
import { useWatchlistStore, WatchlistItem } from "@/store/watchlist.store";
import { readFile } from "./file.service";

export const initApp = () => {
  const securityListStore = useSecurityListStore();
  const securityList = readFile<SecurityListItem[]>("security-list");
  securityListStore.setList(securityList);

  const portfolioStore = usePortfolioStore();
  const portfolio = readFile<PortfolioItem[]>("portfolio");
  portfolioStore.setItems(portfolio);

  const watchlistStore = useWatchlistStore();
  const watchlist = readFile<WatchlistItem[]>("watchlist");
  watchlistStore.setItems(watchlist);
};
