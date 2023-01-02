import { DomainContext, useChartStore } from "@/store/chart.store";
import { maxBy, minBy } from "lodash";
import { Point } from "../types/types";
import { RangeAxis } from "./axis";
import { DragChartMouseState } from "./mouse-state/drag-chart.mouse-state";
import { DragDrawingMouseState } from "./mouse-state/drag-drawing.mouse-state";
import { DragHandleMouseState } from "./mouse-state/drag-handle.mouse-state";
import { MouseEventType } from "./mouse-state/mouse-state";
import { MouseStateMachine } from "./mouse-state/mouse-state-machine";
import { RenderContext, Renderer } from "./renderer";

export interface Chart {
  heightRatio: number;

  render(ctx: CanvasRenderingContext2D): void;
  wheelMoved(event: WheelEvent): void;
  mouseMoved(event: MouseEvent): void;
  mouseDown(event: MouseEvent): void;
  mouseUp(event: MouseEvent): void;
  isDragging(): boolean;
  isPressable(): boolean;
}

export class BasicChart implements Chart {
  private cursor: Point = { x: 0, y: 0 };
  private renderContext: RenderContext = {} as RenderContext;
  private stateMachine = new MouseStateMachine();

  constructor(private readonly name: string, private readonly renderers: Renderer[], public readonly heightRatio: number) {}

  public render(ctx: CanvasRenderingContext2D): void {
    this.clearCanvas(ctx);

    const store = useChartStore();
    this.renderContext = this.createRenderContext(store.domainContext, ctx);
    this.drawVerticalLines(ctx, this.renderContext);

    this.renderers.forEach((renderer) => {
      renderer.render(this.renderContext);
    });
    store.drawings
      .filter((it) => it.chartName === this.name)
      .forEach((drawing) => {
        drawing.render(this.renderContext);
      });

    ctx.lineWidth = 1;
    ctx.strokeStyle = "purple";
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, this.cursor.y);
    ctx.lineTo(ctx.canvas.width, this.cursor.y);
    ctx.moveTo(this.cursor.x, 0);
    ctx.lineTo(this.cursor.x, ctx.canvas.height);
    ctx.stroke();

    ctx.setLineDash([]);
  }

  wheelMoved(event: WheelEvent) {
    this.stateMachine.trigger(MouseEventType.MouseWheel, event, this.renderContext);
  }

  mouseMoved(event: MouseEvent) {
    this.stateMachine.trigger(MouseEventType.MouseMove, event, this.renderContext);
  }

  mouseDown(event: MouseEvent) {
    this.stateMachine.trigger(MouseEventType.MouseDown, event, this.renderContext);
  }

  mouseUp(event: MouseEvent) {
    this.stateMachine.trigger(MouseEventType.MouseUp, event, this.renderContext);
  }

  isDragging(): boolean {
    return this.stateMachine.currentStateName() === DragChartMouseState.stateName ||
      this.stateMachine.currentStateName() === DragDrawingMouseState.stateName ||
      this.stateMachine.currentStateName() === DragHandleMouseState.stateName;
  }

  isPressable(): boolean {
    const store = useChartStore();
    return store.hoveredHandle !== undefined;
  }

  private clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.setTransform(1, 0, 0, 1, 0.5, 0.5);
  }

  private createRenderContext(domainContext: DomainContext, ctx: CanvasRenderingContext2D): RenderContext {
    const minMaxList = this.renderers.map((renderer) => renderer.calcMinMax(domainContext));

    const canvasHeight = ctx.canvas.height;
    const minValue = minBy(minMaxList, (it) => it.min)!!.min;
    const maxValue = maxBy(minMaxList, (it) => it.max)!!.max;
    const rangeAxis = new RangeAxis(minValue, maxValue, 0, canvasHeight);

    return { ...domainContext, rangeAxis, canvasCtx: ctx, canvasHeight, chartName: this.name };
  }

  private drawVerticalLines(ctx: CanvasRenderingContext2D, renderContext: RenderContext) {
    ctx.strokeStyle = "lightgray";
    ctx.beginPath();
    ctx.moveTo(ctx.canvas.width - 100, 0);
    ctx.lineTo(ctx.canvas.width - 100, ctx.canvas.height);
    for (let i = 0; i < renderContext.quotePositions.length; i++) {
      const quotePosition = renderContext.quotePositions[i];
      if (quotePosition.major) {
        const pos = quotePosition.pos;
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, ctx.canvas.height);
      }
    }
    ctx.stroke();
  }
}
