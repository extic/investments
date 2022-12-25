import { RenderContext } from "@/store/chart.store";
import { max, min } from "lodash";
import { Axis } from "../axis";
import { MinMax } from "../chart-generator.service";
import { Renderer } from "../renderer";

export class LineRenderer extends Renderer {
  constructor(protected readonly data: number[]) {
    super();
  }

  initAxis(context: RenderContext, canvasHeight: number): void {
    const slicedData = this.data.slice(context.fromIndex, context.toIndex + 1);
    const minValue = min(slicedData)!!
    const maxValue = max(slicedData)!!
    this.rangeAxis = new Axis(minValue, maxValue, canvasHeight);
  }

  render(ctx: CanvasRenderingContext2D, context: RenderContext, canvasHeight: number): void {
      ctx.strokeStyle = "black"
      ctx.beginPath();

      let startOfLine = true;
      for (let i=0; i < context.quotePositions.length; i++) {
        const dataIndex = context.quotePositions[i].index;
        if (dataIndex !== undefined) {
          const pos = context.quotePositions[i].pos;
          const canvasPosY = this.rangeAxis!!.toCanvas(this.data[dataIndex]);

          if (startOfLine) {
            ctx.moveTo(pos, canvasPosY)
          } else {
            ctx.lineTo(pos, canvasPosY)
          }
          startOfLine = false;
        } else {
          startOfLine = true;
        }
      }
      ctx.stroke();
  }

  // public paint(ctx: CanvasRenderingContext2D, startIndex: number, endIndex: number, quoteWidth: number): void {
  //   const width = ctx.canvas.width;
  //   const height = ctx.canvas.height;

  //   const { min, max } = this.findMinMax(startIndex, endIndex);

  //   ctx.fillStyle = "blue";
  //   let pos = width - quoteWidth;
  //   for (let i = endIndex - 1; i >= startIndex; i--) {
  //     const diff = max - min;
  //     const from = (this.data[i].low - min) / (max - min);
  //     const to = (this.data[i].high - min) / (max - min);

  //     const low = (1 - (this.data[i].low - min) / diff) * height;
  //     const open = (1 - (this.data[i].open - min) / diff) * height;
  //     const close = (1 - (this.data[i].close - min) / diff) * height;
  //     const high = (1 - (this.data[i].high - min) / diff) * height;

  //     ctx.strokeStyle = "black"
  //     ctx.beginPath();
  //     const roundedPos = Math.round(pos + quoteWidth / 2);
  //     ctx.moveTo(roundedPos, low)
  //     ctx.lineTo(roundedPos, high)
  //     ctx.closePath();
  //     ctx.stroke();

  //     ctx.fillStyle = close > open ? "red" : "green";
  //     ctx.fillRect(pos + 1, close, quoteWidth - 2, -(close-open));

  //     // ctx.strokeStyle = "red";
  //     // ctx.font = "8px helvetica";
  //     // ctx.strokeText(this.data[i].high.toString(), pos + 1, 20);

  //     pos -= quoteWidth;
  //   }

  // }
}
