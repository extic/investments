import { DomainContext } from "@/store/chart.store";
import { RangeAxis } from "./axis";

export type MinMax = {
  min: number;
  max: number;
};

export type RenderContext = DomainContext & {
  canvasCtx: CanvasRenderingContext2D
  canvasHeight: number;
  rangeAxis: RangeAxis;
  chartName: string;
}

export abstract class Renderer {
  abstract calcMinMax(context: DomainContext): MinMax;
  abstract render(context: RenderContext): void;
}
