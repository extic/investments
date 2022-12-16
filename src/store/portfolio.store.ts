import { Security } from "@/types/types";
import { defineStore } from "pinia";

export type PortfolioItem = Security & {
  id: string;
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
    _selected: undefined as PortfolioItem | undefined,
  }),

  getters: {
    items: (state): PortfolioItem[] => state._items,
    selected: (state): PortfolioItem | undefined => state._selected,
  },

  actions: {
    setItems(items: PortfolioItem[]): void {
      this._items = items;
    },

    setSelected(selected: PortfolioItem | undefined): void {
      this._selected = selected;
    },
  },
});
