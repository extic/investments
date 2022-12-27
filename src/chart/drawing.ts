import { RenderContext } from "@/store/chart.store";
import { Axis } from "./axis";

export interface Drawing {
  render(ctx: CanvasRenderingContext2D, context: RenderContext, canvasHeight: number, rangeAxis: Axis): void;
  isHover(): boolean;
}
