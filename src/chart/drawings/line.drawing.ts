import { useChartStore } from "@/store/chart.store";
import { Point } from "@/types/types";
import { Drawing } from "../drawing";
import { RenderContext } from "../renderer";

export type LineDrawingData = {
  handles: Point[];
}

export class LineDrawing implements Drawing {
  readonly type: string;
  private canvasHandles: Point[] = [];

  constructor(public readonly chartName: string, readonly data: LineDrawingData) {
    this.type = "line";
  }

  render(renderContext: RenderContext): void {
    const store = useChartStore();
    const isSelected = (store.hoveredDrawing == this as unknown as Drawing);

    this.canvasHandles = this.data.handles.map((it) => {
      return {
        x: renderContext.domainAxis.toCanvas(it.x),
        y: renderContext.rangeAxis.toCanvas(it.y),
      }
    })

    const ctx = renderContext.canvasCtx;
    ctx.lineWidth = isSelected ? 2 : 1;
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(this.canvasHandles[0].x, renderContext.canvasHeight - this.canvasHandles[0].y);
    ctx.lineTo(this.canvasHandles[1].x, renderContext.canvasHeight - this.canvasHandles[1].y);
    ctx.stroke();

    if (isSelected) {
      ctx.fillStyle = store.hoveredHandle === 0 ? 'blue' : 'white';
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.arc(this.canvasHandles[0].x, renderContext.canvasHeight - this.canvasHandles[0].y, 5, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = store.hoveredHandle === 1 ? 'blue' : 'white';
      ctx.beginPath();
      ctx.arc(this.canvasHandles[1].x, renderContext.canvasHeight - this.canvasHandles[1].y, 5, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
    }
  }

  isHover(cursorX: number, cursorY: number): boolean {
    const minHandleX = Math.min(this.canvasHandles[0].x, this.canvasHandles[1].x) - 5;
    const minHandleY = Math.min(this.canvasHandles[0].y, this.canvasHandles[1].y) - 5;
    const maxHandleX = Math.max(this.canvasHandles[0].x, this.canvasHandles[1].x) + 5;
    const maxHandleY = Math.max(this.canvasHandles[0].y, this.canvasHandles[1].y) + 5;

    return (cursorX >= minHandleX && cursorX <= maxHandleX && cursorY >= minHandleY && cursorY <= maxHandleY)
  }

  getHoveredHandle(cursorX: number, cursorY: number): number | undefined {
    const index = this.canvasHandles.findIndex((it, index) => {
      return (cursorX >= it.x - 5 && cursorX <= it.x + 5 && cursorY >= it.y - 5 && cursorY <= it.y + 5);
    });

    return index === -1 ? undefined : index;
  }

  move(deltaX: number, deltaY: number): void {
    this.data.handles.forEach((it) => {
      it.x += deltaX;
      it.y += deltaY;
    });
  }

  moveHandle(deltaX: number, deltaY: number, handle: number): void {
    this.data.handles[handle].x += deltaX;
    this.data.handles[handle].y += deltaY;
  }
}
