import { defineStore } from "pinia";

export type SecurityData = {
  closeRate: number;
  dealsNo: number;
  highRate: number;
  lowRate: number;
  openRate: number;
  tradeDate: string;
}

export const useChartStore = defineStore("chart", {
  state: () => ({
    _securityData: [] as SecurityData[],
    _startIndex: 0,
    _endIndex: 0,
    _quoteWidth: 0,
  }),

  getters: {
    securityData: (state): SecurityData[] => state._securityData,
    startIndex: (state): number => state._startIndex,
    endIndex: (state): number => state._endIndex,
    quoteWidth: (state): number => state._quoteWidth,
  },

  actions: {
    setSecurityData(data: SecurityData[]): void {
      this._securityData = data;
    },

    setIndexes(startIndex: number, endIndex: number, quoteWidth: number): void {
      this._startIndex = startIndex;
      this._endIndex = endIndex;
      this._quoteWidth = quoteWidth;
    },
  },
});
