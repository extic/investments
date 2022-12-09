import { max, maxBy, minBy } from "lodash";
import { ChartRenderer } from "./chart.renderer";
import { MinMax } from "./chart-generator.service";
import { CandleStickData } from "./candlestick.data-provider";

export class CandleStickChartRenderer implements ChartRenderer {
  constructor(private readonly height: number, private readonly data: CandleStickData[]) { }

  public getHeight(): number {
    return this.height;
  }

  public findMinMax(startIndex: number, endIndex: number): MinMax {
    const slicedData = this.data.slice(startIndex, endIndex);
    return {
      min: minBy(slicedData, (it) => it.low)!!.low,
      max: maxBy(slicedData, (it) => it.high)!!.high,
    };
  }

  public paint(ctx: CanvasRenderingContext2D, startIndex: number, endIndex: number, quoteWidth: number): void {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    ctx.clearRect(0, 0, width, height);

    // console.log("quoteWidth", quoteWidth);
    const { min, max } = this.findMinMax(startIndex, endIndex);

    // console.log(min, max);

    // console.log(ctx.canvas.height)



    ctx.fillStyle = "blue";
    let pos = width - quoteWidth;
    for (let i = endIndex - 1; i >= startIndex; i--) {
      const diff = max - min;
      const from = (this.data[i].low - min) / (max - min);
      const to = (this.data[i].high - min) / (max - min);

      const low = (1 - (this.data[i].low - min) / diff) * height;
      const open = (1 - (this.data[i].open - min) / diff) * height;
      const close = (1 - (this.data[i].close - min) / diff) * height;
      const high = (1 - (this.data[i].high - min) / diff) * height;
      // console.log(this.data[i].low, min, max, from)
      // console.log(from, to, (1-from) * height, (1-(to-from)) * height)
      ctx.strokeStyle = "black"
      ctx.beginPath();
      const roundedPos = Math.round(pos + quoteWidth / 2);
      ctx.moveTo(roundedPos, low)
      ctx.lineTo(roundedPos, high)
      ctx.closePath();
      ctx.stroke();

      ctx.fillStyle = close > open ? "red" : "green";
      ctx.fillRect(pos + 1, close, quoteWidth - 2, -(close-open));

      ctx.strokeStyle = "red";
      ctx.font = "8px helvetica";
      ctx.strokeText(this.data[i].high.toString(), pos + 1, 20);

      pos -= quoteWidth;
    }

  }
}
