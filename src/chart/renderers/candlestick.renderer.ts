import { RenderContext } from "@/store/chart.store";
import { maxBy, minBy } from "lodash";
import { Axis } from "../axis";
import { CandleStickData } from "../data-providers/candlestick.data-provider";
import { Renderer } from "../renderer";

export class CandleStickRenderer extends Renderer {
  constructor(private readonly data: CandleStickData[]) {
    super();
  }

  initAxis(context: RenderContext, canvasHeight: number): void {
    const slicedData = this.data.slice(context.fromIndex, context.toIndex);

    const minValue = minBy(slicedData, (it) => it.low)!!.low;
    const maxValue = maxBy(slicedData, (it) => it.high)!!.high;
    this.rangeAxis = new Axis(minValue, maxValue, canvasHeight);
  }

  render(ctx: CanvasRenderingContext2D, context: RenderContext): void {
    for (let i=0; i < context.quotePositions.length; i++) {
      const dataIndex = context.quotePositions[i].index;
      if (dataIndex !== undefined) {
        const data = this.data[dataIndex];
        const pos = context.quotePositions[i].pos;
        const low = this.rangeAxis!!.toCanvas(data.low);
        const open = this.rangeAxis!!.toCanvas(data.open);
        const close = this.rangeAxis!!.toCanvas(data.close);
        const high = this.rangeAxis!!.toCanvas(data.high);

        ctx.strokeStyle = "black"
        ctx.beginPath();
        ctx.moveTo(pos, low)
        ctx.lineTo(pos, high)
        ctx.stroke();

        ctx.fillStyle = close > open ? "red" : "green";
        ctx.fillRect(pos - context.quoteWidth / 2 + 1, close, context.quoteWidth - 2, open-close);
      }
    }
  }
}
