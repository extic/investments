import { useChartStore } from "@/store/chart.store";
import { RenderContext } from "../renderer";
import { DragDrawingMouseState } from "./drag-drawing.mouse-state";
import { HoveringHandleMouseState } from "./hovering-handle.mouse-state";
import { MouseEventType, MouseState } from "./mouse-state";
import { MouseStateMachine } from "./mouse-state-machine";
import { NeutralMouseState } from "./neutral.mouse-state";
import { getHoveredDrawing, getHoveredHandle } from "./state-utils";

export class HoveringDrawingMouseState implements MouseState {
  static readonly stateName = "HoveringDrawing";

  constructor(readonly stateMachine: MouseStateMachine) {}

  getStateName(): string {
    return HoveringDrawingMouseState.stateName;
  }

  trigger(eventType: MouseEventType, event: MouseEvent, renderContext: RenderContext) {
    switch (eventType) {
      case MouseEventType.MouseMove: {
        const drawing = getHoveredDrawing(event.offsetX, event.offsetY, renderContext);
        const store = useChartStore();
        store.setSelectedDrawing(drawing);
        if (drawing !== undefined) {
          const handle = getHoveredHandle(event.offsetX, event.offsetY, renderContext, drawing);
          store.setSelectedHandle(handle);
          if (handle !== undefined) {
            this.stateMachine.transition(HoveringHandleMouseState.stateName);
          } else {

          }
        } else {
          this.stateMachine.transition(NeutralMouseState.stateName);
        }
        break;
      }

      case MouseEventType.MouseDown: {
        this.stateMachine.transition(DragDrawingMouseState.stateName);
        break;
      }
    }
  }
}
