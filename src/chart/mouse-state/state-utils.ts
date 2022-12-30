import { useChartStore } from "@/store/chart.store";
import { Drawing } from "../drawing";
import { RenderContext } from "../renderer"
import { HoveringDrawingMouseState } from "./hovering-drawing.mouse-state";
import { HoveringHandleMouseState } from "./hovering-handle.mouse-state";
import { MouseStateMachine } from "./mouse-state-machine";
import { NeutralMouseState } from "./neutral.mouse-state";

const getHoveredDrawing = (cursorX: number, cursorY: number, renderContext: RenderContext): Drawing | undefined => {
  const store = useChartStore();
  const drawing = store.drawings
    .filter((it) => it.chartName === renderContext.chartName)
    .find((it) => it.isHover(cursorX, renderContext.canvasHeight - cursorY))
  return drawing;
}

const getHoveredHandle = (cursorX: number, cursorY: number, renderContext: RenderContext, drawing: Drawing): number | undefined => {
  return drawing.getHoveredHandle(cursorX, renderContext.canvasHeight - cursorY);
}

export const handleChoices = (event: MouseEvent, renderContext: RenderContext, stateMachine: MouseStateMachine) => {
  const store = useChartStore();
  const isInDrawingMode = true;
  if (isInDrawingMode) {
    const drawing = getHoveredDrawing(event.offsetX, event.offsetY, renderContext);
    store.setHoveredDrawing(drawing);
    if (drawing !== undefined) {
      const handle = getHoveredHandle(event.offsetX, event.offsetY, renderContext, drawing);
      store.setHoveredHandle(handle);
      if (handle !== undefined) {
        stateMachine.transition(HoveringHandleMouseState.stateName);
      } else {
        stateMachine.transition(HoveringDrawingMouseState.stateName);
      }
    } else {
      store.setHoveredHandle(undefined);
      stateMachine.transition(NeutralMouseState.stateName);
    }
  } else {
    store.setHoveredDrawing(undefined);
    store.setHoveredHandle(undefined);
    stateMachine.transition(NeutralMouseState.stateName);
  }
}
