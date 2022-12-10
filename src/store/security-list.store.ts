import { defineStore } from "pinia";

export type Security = {
  securityNumber: string;
  securityName: string;
  symbol: string;
}

export const useSecurityListStore = defineStore("securityList", {
  state: () => ({
    _securityList: [] as Security[],
  }),

  getters: {
    securityList: (state): Security[] => state._securityList,
  },

  actions: {
    setSecurityList(list: Security[]): void {
      this._securityList = list;
    },
  },
});
