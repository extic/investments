import { Security } from "@/types/types";
import { defineStore } from "pinia";

export type Portfolio = {
  lastRefresh: string | undefined;
  items: PortfolioItem[];
}

export type PortfolioItem = {
  id: string;
  securityId: string;
  name: string;
  buyDate: string;
  buyRate: number;
  quantity: number;
  buyPrice: number;
  buyCommission: number;
  lastRate: number;
  changeFromBuy: number;
  changeFromBuyPercentage: number;
  changeToday: number;
  changeTodayPercentage: number;
};

export type SecurityInfo = {
  number: string;
  lastRate: number;
  baseRate: number;
}

const createEmptyPortfolio = (): Portfolio => {
  return {
    lastRefresh: undefined,
    items: [],
  };
};

export const usePortfolioStore = defineStore("portfolio", {
  state: () => ({
    _portfolio: createEmptyPortfolio() as Portfolio,
    _selected: undefined as PortfolioItem | undefined,
  }),

  getters: {
    portfolio: (state): Portfolio => state._portfolio,
    lastRefresh: (state): string | undefined => state._portfolio.lastRefresh,
    items: (state): PortfolioItem[] => state._portfolio.items,
    selected: (state): PortfolioItem | undefined => state._selected,
  },

  actions: {
    setPortfolio(porfolio: Portfolio): void {
      this._portfolio = porfolio;
    },

    setSelected(selected: PortfolioItem | undefined): void {
      this._selected = selected;
    },

    setLastRefresh(lastRefresh: string): void {
      this._portfolio.lastRefresh = lastRefresh;
    },
  },
});
