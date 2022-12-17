import chartRecalculator from "@/chart/chart-calculator.service";
import { SelectedSecurity } from "@/types/types";
import { Moment } from "moment";
import { defineStore } from "pinia";
import { ChartRenderer } from "../chart/chart.renderer";

export type SecurityData = {
  closeRate: number;
  dealsNo: number;
  highRate: number;
  lowRate: number;
  openRate: number;
  tradeDate: Moment;
  tradeDateStr: string;
  volume: number;
}

export const useChartStore = defineStore("chart", {
  state: () => ({
    _selectedSecurity: undefined as SelectedSecurity,
    _securityData: [] as SecurityData[],
    _scrollPosition: 0,
    _scrollLength: 1,
    _startIndex: 0,
    _chartWidth: 0,
    _endIndex: 0,
    _quoteWidth: 0,
    _chartRenderers: [] as ChartRenderer[],
    _chartPaintTrigger: 0,
  }),

  getters: {
    selectedSecurity: (state): SelectedSecurity => state._selectedSecurity,
    securityData: (state): SecurityData[] => state._securityData,
    scrollPosition: (state): number => state._scrollPosition,
    scrollLength: (state): number => state._scrollLength,
    chartWidth: (state): number => state._chartWidth,
    startIndex: (state): number => state._startIndex,
    endIndex: (state): number => state._endIndex,
    quoteWidth: (state): number => state._quoteWidth,
    chartRenderers: (state): ChartRenderer[] => state._chartRenderers,
    chartPaintTrigger: (state): number => state._chartPaintTrigger,
  },

  actions: {
    setSelectedSecurity(selectedSecurity: SelectedSecurity): void {
      this._selectedSecurity = selectedSecurity;
    },

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
      this._chartPaintTrigger++;
    },

    setChartRenderers(chartRenderers: ChartRenderer[]): void {
      this._chartRenderers = chartRenderers;
    },
  },
});