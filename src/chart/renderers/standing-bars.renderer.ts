import { max } from "lodash";
import { DomainContext } from "../../store/chart.store";
import { MinMax, RenderContext, Renderer } from "../renderer";

export class StandingBarsRenderer extends Renderer {
  constructor(protected readonly data: number[]) {
    super();
  }

  calcMinMax(context: DomainContext): MinMax {
    const maxValue = max(this.data.slice(context.fromIndex, context.toIndex + 1))!!
    return { min: 0, max: maxValue };
  }

  render(context: RenderContext): void {
    const canvasHeight = context.canvasHeight;
    const ctx = context.canvasCtx;
    ctx.fillStyle = "blue";
    for (let i=0; i < context.quotePositions.length; i++) {
      const dataIndex = context.quotePositions[i].index;
      if (dataIndex !== undefined) {
        const pos = context.quotePositions[i].pos;
        const canvasPosY = context.rangeAxis.toCanvas(this.data[dataIndex]);

        ctx.fillRect(pos - context.quoteWidth / 2 + 1, canvasHeight, context.quoteWidth - 2, canvasPosY - canvasHeight);
      }
    }
  }
}
