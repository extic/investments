import chartRecalculator from "@/chart/chart-calculator.service";
import { defineStore } from "pinia";
import { ChartRenderer } from "../chart/chart.renderer";

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
    _scrollPosition: 0,
    _scrollLength: 1,
    _startIndex: 0,
    _chartWidth: 0,
    _endIndex: 0,
    _quoteWidth: 0,
    _chartRenderers: [] as ChartRenderer[],
  }),

  getters: {
    securityData: (state): SecurityData[] => state._securityData,
    scrollPosition: (state): number => state._scrollPosition,
    scrollLength: (state): number => state._scrollLength,
    chartWidth: (state): number => state._chartWidth,
    startIndex: (state): number => state._startIndex,
    endIndex: (state): number => state._endIndex,
    quoteWidth: (state): number => state._quoteWidth,
    chartRenderers: (state): ChartRenderer[] => state._chartRenderers,
  },

  actions: {
    setSecurityData(data: SecurityData[]): void {
      this._securityData = data;
    },

    setScroll(position: number, length: number): void {
      this._scrollPosition = position;
      this._scrollLength = length;
      chartRecalculator.recalc();
    },

    setChartWidth(width: number): void {
      this._chartWidth = width;
      chartRecalculator.recalc();
    },

    setIndexes(startIndex: number, endIndex: number, quoteWidth: number): void {
      this._startIndex = startIndex;
      this._endIndex = endIndex;
      this._quoteWidth = quoteWidth;

      // console.log(startIndex, endIndex, quoteWidth);
    },

    setChartRenderers(chartRenderers: ChartRenderer[]): void {
      this._chartRenderers = chartRenderers;
    },
  },
});
