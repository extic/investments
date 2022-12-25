import { useChartStore } from "@/store/chart.store";
import { maxBy, minBy } from "lodash";
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

    ctx.strokeStyle = "lightgray";
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width - 100, 0);
    ctx.lineTo(ctx.canvas.width - 100, ctx.canvas.height);
    ctx.closePath();
    ctx.stroke();

    this.renderers.forEach((renderer) => {
      renderer.initAxis(store.renderContext, ctx.canvas.height);
    });
    if (this.combinedRange) {
      const axes = this.renderers.map((it) => it.rangeAxis);
      const minValue = minBy(axes, (it) => it?.min)!!.min;
      const maxValue = minBy(axes, (it) => it?.min)!!.max;
      const commonAxis = new Axis(minValue, maxValue, ctx.canvas.height);
      this.renderers.forEach((it) => it.rangeAxis = commonAxis);
    }

    this.renderers.forEach((renderer) => {
      renderer.render(ctx, store.renderContext, ctx.canvas.height);
    });

    // ctx.strokeStyle = "lightgray";
    // ctx.beginPath();
    // for (let i = 0; i < store.endIndex - store.startIndex; i += 5) {
    //   const pos = Math.round(ctx.canvas.width - i * store.quoteWidth - store.quoteWidth / 2);
    //   ctx.moveTo(pos, 0);
    //   ctx.lineTo(pos, ctx.canvas.height);
    // }
    // ctx.closePath();
    // ctx.stroke();
  }
}
