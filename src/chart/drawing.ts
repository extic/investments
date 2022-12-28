import { RenderContext } from "./renderer";

export interface Drawing {
  readonly chartName: string;
  readonly selected: boolean;

  render(context: RenderContext): void;
  handleMouseOver(cursorX: number, cursorY: number): void;
  isHover(): boolean;
}
