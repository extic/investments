import { MinMax } from "./chart-generator.service";


export interface ChartRenderer {
  getHeight(): number;
  findMinMax(startIndex: number, endIndex: number): MinMax;
  paint(ctx: CanvasRenderingContext2D, startIndex: number, endIndex: number, quoteWidth: number): void;
}
