import { RenderContext, useChartStore } from "@/store/chart.store";
import { minBy } from "lodash";
import { Axis } from "./axis";
import { Renderer } from "./renderer";

export interface Chart {
  heightRatio: number;

  render(ctx: CanvasRenderingContext2D): void;
}

export class BasicChart implements Chart {
  constructor(
    private readonly renderers: Renderer[],
    private readonly combinedRange: boolean,
    public readonly heightRatio: number
  ) {}

  public render(ctx: CanvasRenderingContext2D): void {
    const store = useChartStore();
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const renderContext = store.renderContext;

    this.drawVerticalLines(ctx, renderContext);
    this.initializeAxes(ctx, renderContext);

    this.renderers.forEach((renderer) => {
      renderer.render(ctx, renderContext, ctx.canvas.height);
    });
  }

  private drawVerticalLines(ctx: CanvasRenderingContext2D, renderContext: RenderContext) {
    ctx.strokeStyle = "lightgray";
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width - 100, 0);
    ctx.lineTo(ctx.canvas.width - 100, ctx.canvas.height);
    for (let i = 0; i < renderContext.quotePositions.length; i++) {
      const quotePosition = renderContext.quotePositions[i];
      if (quotePosition.major) {
        const pos = quotePosition.pos;
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, ctx.canvas.height);
      }
    }
    ctx.stroke();
  }

  private initializeAxes(ctx: CanvasRenderingContext2D, renderContext: RenderContext) {
    this.renderers.forEach((renderer) => {
      renderer.initAxis(renderContext, ctx.canvas.height);
    });

    if (this.combinedRange) {
      const axes = this.renderers.map((it) => it.rangeAxis);
      const minValue = minBy(axes, (it) => it?.min)!!.min;
      const maxValue = minBy(axes, (it) => it?.min)!!.max;
      const commonAxis = new Axis(minValue, maxValue, ctx.canvas.height);
      this.renderers.forEach((it) => it.rangeAxis = commonAxis);
    }
  }
}
