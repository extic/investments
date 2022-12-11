import { defineStore } from "pinia";

export type PortfolioItem = {
  id: string;
  securityNumber: string;
  securityName: string;
  buyDate: string;
  buyPrice: number;
  quantity: number;
  buyAmount: number;
  buyCommission: number;
  currentQuote: number;
  changeFromBuy: number;
  changeFromBuyPercentage: number;
  changeToday: number;
  changeTodayPercentage: number;
};

export const usePortfolioStore = defineStore("portfolio", {
  state: () => ({
    _items: [] as PortfolioItem[],
  }),

  getters: {
    items: (state): PortfolioItem[] => state._items,
  },

  actions: {
    setItems(items: PortfolioItem[]): void {
      this._items = items;
    },
  },
});
