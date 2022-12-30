import { useChartStore } from "@/store/chart.store";
import { Drawing } from "../drawing";
import { RenderContext } from "../renderer"

export const getHoveredDrawing = (cursorX: number, cursorY: number, renderContext: RenderContext): Drawing | undefined => {
  const store = useChartStore();
  const drawing = store.drawings
    .filter((it) => it.chartName === renderContext.chartName)
    .find((it) => it.isHover(cursorX, renderContext.canvasHeight - cursorY))
  return drawing;
}

export const getHoveredHandle = (cursorX: number, cursorY: number, renderContext: RenderContext, drawing: Drawing): number | undefined => {
  return drawing.getHoveredHandle(cursorX, renderContext.canvasHeight - cursorY);
}
