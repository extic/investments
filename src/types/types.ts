import { PortfolioItem } from "@/store/portfolio.store";
import { SecurityListItem } from "@/store/security-list.store";
import { WatchlistItem } from "@/store/watchlist.store";

export type Security = {
  number: string;
  name: string;
}

export type SelectedSecurity = undefined | SecurityListItem | PortfolioItem | WatchlistItem

export type Point = {
  x: number;
  y: number;
}
