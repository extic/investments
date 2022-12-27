import { RenderContext } from "@/store/chart.store";
import { Point } from "electron/renderer";
import { Axis } from "../axis";
import { Drawing } from "../drawing";

export type LineDrawingData = {
  handles: Point[];
}

export class LineDrawing implements Drawing {
  // private point1: Point = { x: 0, y: 63830 }
  // private point2: Point = { x: 3, y: 68050 }

  constructor(private readonly data: LineDrawingData) {}

  render(ctx: CanvasRenderingContext2D, context: RenderContext, canvasHeight: number, rangeAxis: Axis): void {
    const handle1PosX = context.domainAxis.toCanvas(this.data.handles[0].x);
    const handle1PosY = rangeAxis.toCanvas(this.data.handles[0].y);
    const handle2PosX = context.domainAxis.toCanvas(this.data.handles[1].x);
    const handle2PosY = rangeAxis.toCanvas(this.data.handles[1].y);

    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(handle1PosX, handle1PosY);
    ctx.lineTo(handle2PosX, handle2PosY);
    ctx.stroke();

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

  isHover(): boolean {
    throw new Error("Method not implemented.");
  }

}
