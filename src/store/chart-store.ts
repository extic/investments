import { defineStore } from "pinia";

export const useChartStore = defineStore("chart", {
  state: () => ({
    _scrollLeft: 0,
    _scrollRight: 0,
  }),

  getters: {
    scrollLeft: (state): number => state._scrollLeft,
    scrollRight: (state): number => state._scrollRight,
  },

  actions: {
    setScroll(scrollLeft: number, scrollRight: number): void {
      this._scrollLeft = scrollLeft;
      this._scrollRight = scrollRight;
    },
  },
});
