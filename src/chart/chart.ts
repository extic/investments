import { DomainContext, useChartStore } from "@/store/chart.store";
import { maxBy, minBy } from "lodash";
import { RenderContext, Renderer } from "./renderer";
import { Point } from "../types/types";
import { Drawing } from "./drawing";
import { RangeAxis } from "./axis";

export interface Chart {
  heightRatio: number;

  render(ctx: CanvasRenderingContext2D): void;
  mouseMoved(event: MouseEvent, ctx: CanvasRenderingContext2D): void;
}

export class BasicChart implements Chart {
  private cursor: Point = {x: 0, y: 0};
  private selectedDrawing: Drawing | undefined = undefined;

  constructor(
    private readonly name: string,
    private readonly renderers: Renderer[],
    public readonly heightRatio: number
  ) {}

  public render(ctx: CanvasRenderingContext2D): void {
    this.clearCanvas(ctx);

    const store = useChartStore();
    const renderContext = this.createRenderContext(store.domainContext, ctx);
    this.drawVerticalLines(ctx, renderContext);

    this.renderers.forEach((renderer) => {
      renderer.render(renderContext);
    });
    store.drawings
      .filter((it) => it.chartName === this.name)
      .forEach((drawing) => {
        drawing.render(renderContext);
      });

      // console.log("cursor", this.cursor.y, this.renderers[0].rangeAxis!!.toCanvas(this.cursor.y));

      ctx.lineWidth = 1;
      ctx.strokeStyle = "purple";
      ctx.setLineDash([5,5]);
      ctx.beginPath();
      ctx.moveTo(0, this.cursor.y);
      ctx.lineTo(ctx.canvas.width, this.cursor.y);
      ctx.moveTo(this.cursor.x, 0);
      ctx.lineTo(this.cursor.x, ctx.canvas.height);
      ctx.stroke();

      ctx.setLineDash([]);
  }

  mouseMoved(event: MouseEvent, ctx: CanvasRenderingContext2D): void {
    this.cursor = { x: event.offsetX, y: event.offsetY };

    const store = useChartStore();

    // const cursorX = store.renderContext.domainAxis.toDomain(event.offsetX);
    // const cursorY = store.renderContext.rangeAxis.toDomain(ctx.canvas.height - event.offsetY);

    // store.drawings
    //   .filter((it) => it.chartName === this.name)
    //   .forEach((drawing, index) => {
    //     drawing.handleMouseOver(cursorX, cursorY);
    //   });
  }

  private clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0.5, 0.5);
  }

  private createRenderContext(domainContext: DomainContext, ctx: CanvasRenderingContext2D): RenderContext {
    const minMaxList = this.renderers.map((renderer) => renderer.calcMinMax(domainContext))

    const canvasHeight = ctx.canvas.height;
    const minValue = minBy(minMaxList, (it) => it.min)!!.min;
    const maxValue = maxBy(minMaxList, (it) => it.max)!!.max;
    const rangeAxis = new RangeAxis(minValue, maxValue, 0, canvasHeight);

    return { ...domainContext, rangeAxis, canvasCtx: ctx, canvasHeight }
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
}
