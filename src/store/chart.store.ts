import { DomainAxis } from "@/chart/axis";
import { Chart } from "@/chart/chart";
import { Drawing } from "@/chart/drawing";
import { Security } from "@/types/types";
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

export type DomainContext = {
  quotePositions: QuotePosition[],
  quoteWidth: number;
  canvasWidth: number;
  fromIndex: number;
  toIndex: number;
  domainAxis: DomainAxis;
}

export const useChartStore = defineStore("chart", {
  state: () => ({
    _selectedSecurity: undefined as Security | undefined,
    _quotes: [] as Quote[],
    _drawings: [] as Drawing[],
    _charts: [] as Chart[],
    _fromPos: 0,
    _toPos: 0,
    _canvasWidth: 0,
    _quoteWidth: 0,
    _domainContext: {} as DomainContext,
    _hoveredDrawing: undefined as Drawing | undefined,
    _hoveredHandle: undefined as number | undefined,
    _forceRender: 0,
    _drawMode: false,
  }),

  getters: {
    selectedSecurity: (state): Security | undefined=> state._selectedSecurity,
    quotes: (state): Quote[] => state._quotes,
    drawings: (state): Drawing[] => state._drawings,
    charts: (state): Chart[] => state._charts,
    fromPos: (state): number => state._fromPos,
    toPos: (state): number => state._toPos,
    canvasWidth: (state): number => state._canvasWidth,
    quoteWidth: (state): number => state._quoteWidth,
    domainContext: (state): DomainContext => state._domainContext,
    hoveredDrawing: (state): Drawing | undefined => state._hoveredDrawing,
    hoveredHandle: (state): number | undefined => state._hoveredHandle,
    forceRender: (state): number => state._forceRender,
    drawMode: (state): boolean => state._drawMode,
  },

  actions: {
    setSelectedSecurity(selectedSecurity: Security | undefined): void {
      this._selectedSecurity = selectedSecurity;
    },

    setChartData(quotes: Quote[], drawings: Drawing[]): void {
      this._quotes = quotes;
      this._drawings = drawings;
    },

    addDrawing(drawing: Drawing): void {
      this._drawings = [drawing, ...this._drawings];
      this.setForceRender();
    },

    deleteDrawing(drawing: Drawing): void {
      const index = this._drawings.findIndex((it) => it === drawing);
      if (index !== -1) {
        this._drawings.splice(index, 1);
      }
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

    setCanvasWidth(width: number): void {
      this._canvasWidth = width;
    },

    setDomainContext(context: DomainContext): void {
      this._domainContext = context;
    },

    setHoveredDrawing(drawing: Drawing | undefined): void {
      this._hoveredDrawing = drawing;
    },

    setHoveredHandle(handle: number | undefined): void {
      this._hoveredHandle = handle;
    },

    setForceRender(): void {
      this._forceRender++;
    },

    toggleDrawMode(): void {
      this._drawMode = !this.drawMode;
    }
  },
});
