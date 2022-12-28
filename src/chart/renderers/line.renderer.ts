import { DomainContext } from "@/store/chart.store";
import { max, min } from "lodash";
import { MinMax, RenderContext, Renderer } from "../renderer";

export class LineRenderer extends Renderer {
  constructor(protected readonly data: number[]) {
    super();
  }

  calcMinMax(context: DomainContext): MinMax {
    const slicedData = this.data.slice(context.fromIndex, context.toIndex + 1);
    const minValue = min(slicedData)!!;
    const maxValue = max(slicedData)!!;
    return { min: minValue, max: maxValue };
  }

  render(context: RenderContext): void {
    const ctx = context.canvasCtx;
    ctx.strokeStyle = "black";
    ctx.beginPath();

    let startOfLine = true;
    for (let i = 0; i < context.quotePositions.length; i++) {
      const dataIndex = context.quotePositions[i].index;
      if (dataIndex !== undefined) {
        const pos = context.quotePositions[i].pos;
        const canvasPosY = context.rangeAxis.toCanvas(this.data[dataIndex]);

        if (startOfLine) {
          ctx.moveTo(pos, canvasPosY);
        } else {
          ctx.lineTo(pos, canvasPosY);
        }
        startOfLine = false;
      } else {
        startOfLine = true;
      }
    }
    ctx.stroke();
  }
}
