import { RenderContext } from "@/store/chart.store";
import { Axis } from "./axis";

export abstract class Renderer {
  public rangeAxis: Axis | undefined

  abstract initAxis(context: RenderContext, canvasHeight: number): void;
  abstract render(ctx: CanvasRenderingContext2D, context: RenderContext, canvasHeight: number): void;
}
