import { RenderContext } from "@/store/chart.store";
import { Axis } from "./axis";

export interface Drawing {
  readonly chartName: string;

  render(ctx: CanvasRenderingContext2D, context: RenderContext, canvasHeight: number, rangeAxis: Axis): void;
  isHover(): boolean;
}
