import { Chart } from "@/chart/chart";
import chartRecalculator from "@/chart/chart-calculator.service";
import { SelectedSecurity } from "@/types/types";
import { defineStore } from "pinia";

export type SecurityData = {
  closeRate: number;
  dealsNo: number;
  highRate: number;
  lowRate: number;
  openRate: number;
  tradeDate: number;
  tradeDateStr: string;
  volume: number;
}

export type QuotePosition = {
  date: number;
  pos: number;
  index: number | undefined;
  major: boolean;
  data: SecurityData | undefined;
}

export type RenderContext = {
  quotePositions: QuotePosition[],
  quoteWidth: number;
  width: number;
  fromIndex: number;
  toIndex: number;
}

export const useChartStore = defineStore("chart", {
  state: () => ({
    _scrollPosition: 0,
    _scrollLength: 1,
    _startIndex: 0,
    _chartWidth: 0,
    _endIndex: 0,
    _chartPaintTrigger: 0,

    _selectedSecurity: undefined as SelectedSecurity,
    _securityData: [] as SecurityData[],
    _charts: [] as Chart[],
    _fromPos: 0,
    _toPos: 0,
    _quoteWidth: 0,
    _renderContext: {} as RenderContext,
  }),

  getters: {
    scrollPosition: (state): number => state._scrollPosition,
    scrollLength: (state): number => state._scrollLength,
    startIndex: (state): number => state._startIndex,
    endIndex: (state): number => state._endIndex,
    chartPaintTrigger: (state): number => state._chartPaintTrigger,

    selectedSecurity: (state): SelectedSecurity => state._selectedSecurity,
    securityData: (state): SecurityData[] => state._securityData,
    charts: (state): Chart[] => state._charts,
    fromPos: (state): number => state._fromPos,
    toPos: (state): number => state._toPos,
    chartWidth: (state): number => state._chartWidth,
    quoteWidth: (state): number => state._quoteWidth,
    renderContext: (state): RenderContext => state._renderContext,
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

    setIndexes(startIndex: number, endIndex: number, quoteWidth: number): void {
      this._startIndex = startIndex;
      this._endIndex = endIndex;
      this._quoteWidth = quoteWidth;
      this._chartPaintTrigger++;
    },

    initCharts(fromPos: number, toPos: number, ...charts: Chart[]): void {
      this._fromPos = fromPos;
      this._toPos = toPos;
      this._charts = charts;
    },

    setChartWidth(width: number): void {
      this._chartWidth = width;
    },

    setRenderContext(context: RenderContext): void {
      this._renderContext = context;
      console.log(context);
    },
  },
});
