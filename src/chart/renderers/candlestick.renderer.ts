import { DomainContext } from "@/store/chart.store";
import { maxBy, minBy } from "lodash";
import { CandleStickData } from "../data-providers/candlestick.data-provider";
import { MinMax, RenderContext, Renderer } from "../renderer";

export class CandleStickRenderer extends Renderer {
  constructor(private readonly data: CandleStickData[]) {
    super();
  }

  calcMinMax(context: DomainContext): MinMax {
    const slicedData = this.data.slice(context.fromIndex, context.toIndex);

    const minValue = minBy(slicedData, (it) => it.low)!!.low;
    const maxValue = maxBy(slicedData, (it) => it.high)!!.high;

    return { min: minValue, max: maxValue };
  }

  render(context: RenderContext): void {
    for (let i=0; i < context.quotePositions.length; i++) {
      const dataIndex = context.quotePositions[i].index;
      if (dataIndex !== undefined) {
        const data = this.data[dataIndex];
        const pos = context.quotePositions[i].pos;
        const low = context.rangeAxis.toCanvas(data.low);
        const open = context.rangeAxis.toCanvas(data.open);
        const close = context.rangeAxis.toCanvas(data.close);
        const high = context.rangeAxis.toCanvas(data.high);

        const ctx = context.canvasCtx;
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
