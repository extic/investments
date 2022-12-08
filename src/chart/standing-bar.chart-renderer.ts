import { max } from "lodash";
import { ChartRenderer } from "./chart.renderer";
import { MinMax } from "./chart-generator.service";

export class StandingBarChartRenderer implements ChartRenderer {
  constructor(private readonly height: number, private readonly data: number[]) { }

  public getHeight(): number {
    return this.height;
  }

  public findMinMax(startIndex: number, endIndex: number): MinMax {
    return {
      min: 0,
      max: max(this.data.slice(startIndex, endIndex + 1))!!,
    };
  }

  public paint(ctx: CanvasRenderingContext2D, width: number, height: number, startIndex: number, endIndex: number, quoteWidth: number): void {
    ctx.clearRect(0, 0, width, height);

    // console.log("quoteWidth", quoteWidth);
    const { min, max } = this.findMinMax(startIndex, endIndex);


    let pos = width - quoteWidth;
    for (let i = endIndex - 1; i >= startIndex; i--) {
      ctx.fillRect(pos + 1, height, quoteWidth - 2, -this.data[i] / (max - min) * height);

      ctx.strokeStyle = "red";
      ctx.font = "11px helvetica";
      ctx.strokeText(this.data[i].toString(), pos + 1, 20);

      pos -= quoteWidth;
    }
  }
}
