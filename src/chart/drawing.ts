import { RenderContext } from "./renderer";

export interface Drawing {
  readonly chartName: string;

  render(context: RenderContext): void;
  isHover(cursorX: number, cursorY: number): boolean;
  getHoveredHandle(cursorX: number, cursorY: number): number | undefined;
  move(deltaX: number, deltaY: number): void;
  moveHandle(deltaX: number, deltaY: number, handle: number): void;
}
