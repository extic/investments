import { DomainAxis } from "@/chart/axis";
import { Chart } from "@/chart/chart";
import { Drawing } from "@/chart/drawing";
import { SelectedSecurity } from "@/types/types";
import { defineStore } from "pinia";

export type Quote = {
  closeRate: number;
  dealsNo: number;
  highRate: number;
  lowRate: number;
  openRate: number;
  tradeDate: string;
  tradeDateMillis: number;
  volume: number;
}

export type QuotePosition = {
  date: number;
  pos: number;
  index: number | undefined;
  major: boolean;
  quote: Quote | undefined;
}

export type RenderContext = {
  quotePositions: QuotePosition[],
  quoteWidth: number;
  width: number;
  fromIndex: number;
  toIndex: number;
  domainAxis: DomainAxis;
}

export const useChartStore = defineStore("chart", {
  state: () => ({
    _selectedSecurity: undefined as SelectedSecurity,
    _quotes: [] as Quote[],
    _drawings: [] as Drawing[],
    _charts: [] as Chart[],
    _fromPos: 0,
    _toPos: 0,
    _chartWidth: 0,
    _quoteWidth: 0,
    _renderContext: {} as RenderContext,
  }),

  getters: {
    selectedSecurity: (state): SelectedSecurity => state._selectedSecurity,
    quotes: (state): Quote[] => state._quotes,
    drawings: (state): Drawing[] => state._drawings,
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

    setChartData(quotes: Quote[], drawings: Drawing[]): void {
      this._quotes = quotes;
      this._drawings = drawings;
    },

    initCharts(fromPos: number, toPos: number, ...charts: Chart[]): void {
      this._fromPos = fromPos;
      this._toPos = toPos;
      this._charts = charts;
    },

    setPositions(fromPos: number, toPos: number): void {
      this._fromPos = fromPos;
      this._toPos = toPos;
    },

    setChartWidth(width: number): void {
      this._chartWidth = width;
    },

    setRenderContext(context: RenderContext): void {
      this._renderContext = context;
    },
  },
});
