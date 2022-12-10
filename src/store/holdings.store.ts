import { defineStore } from "pinia";

export type Holding =   {
  "id": string;
  "securityNumber": string;
  "securityName":string;
  "buyDate": string;
  "buyPrice": number;
  "quantity": number;
  "buyAmount": number;
  "buyCommission": number;
  "currentQuote": number;
  "changeFromBuy": number;
  "changeFromBuyPercentage": number;
  "changeToday": number;
  "changeTodayPercentage": number;
}

export const useHoldingsStore = defineStore("holdings", {
  state: () => ({
    _holdings: [] as Holding[],
  }),

  getters: {
    holdings: (state): Holding[] => state._holdings,
  },

  actions: {
    setHoldings(holdings: Holding[]): void {
      this._holdings = holdings;
    },
  },
});
