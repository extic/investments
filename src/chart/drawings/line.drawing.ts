import { Point } from "electron/renderer";
import { Drawing } from "../drawing";
import { RenderContext } from "../renderer";

export type LineDrawingData = {
  handles: Point[];
}

export class LineDrawing implements Drawing {
  public selected: boolean = false;

  constructor(public readonly chartName: string, private readonly data: LineDrawingData) {}

  render(context: RenderContext): void {
    const handle1PosX = context.domainAxis.toCanvas(this.data.handles[0].x);
    const handle1PosY = context.rangeAxis.toCanvas(this.data.handles[0].y);
    const handle2PosX = context.domainAxis.toCanvas(this.data.handles[1].x);
    const handle2PosY = context.rangeAxis.toCanvas(this.data.handles[1].y);

    console.log(this.data.handles[0], handle1PosX, handle1PosY, context.domainAxis);

    const ctx = context.canvasCtx;
    ctx.lineWidth = this.selected ? 2 : 1;
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(handle1PosX, handle1PosY);
    ctx.lineTo(handle2PosX, handle2PosY);
    ctx.stroke();

    if (this.selected) {
      ctx.fillStyle = 'blue';
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.arc(handle1PosX, handle1PosY, 5, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(handle2PosX, handle2PosY, 5, 0, 2 * Math.PI, false);
      ctx.fill();
      ctx.stroke();
    }
  }

  handleMouseOver(cursorX: number, cursorY: number): void {
    const handles = this.data.handles;
    const minHandleX = Math.min(handles[0].x, handles[1].x);
    const minHandleY = Math.min(handles[0].y, handles[1].y);
    const maxHandleX = Math.max(handles[0].x, handles[1].x);
    const maxHandleY = Math.max(handles[0].y, handles[1].y);

    console.log(cursorX, cursorY, minHandleX, minHandleY, maxHandleX, maxHandleY);

    if (cursorX >= minHandleX && cursorX <= maxHandleX && cursorY >= minHandleY && cursorY <= maxHandleY) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  isHover(): boolean {
    throw new Error("Method not implemented.");
  }

}
