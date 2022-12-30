import { useChartStore } from "@/store/chart.store";
import { RenderContext } from "../renderer";
import { DragChartMouseState } from "./drag-chart.mouse-state";
import { DragHandleMouseState } from "./drag-handle.mouse-state";
import { HoveringDrawingMouseState } from "./hovering-drawing.mouse-state";
import { MouseState, MouseEventType } from "./mouse-state";
import { MouseStateMachine } from "./mouse-state-machine";
import { NeutralMouseState } from "./neutral.mouse-state";
import { SelectedDrawingMouseState } from "./selected-drawing.mouse-state";
import { getHoveredDrawing, getHoveredHandle } from "./state-utils";

export class HoveringHandleMouseState implements MouseState {
  static readonly stateName = "HoveringHandle";

  constructor(readonly stateMachine: MouseStateMachine) {}

  getStateName(): string {
    return HoveringHandleMouseState.stateName;
  }

  trigger(eventType: MouseEventType, event: MouseEvent, renderContext: RenderContext) {
    switch (eventType) {
      case MouseEventType.MouseMove: {
        const store = useChartStore();
        if (store.selectedDrawing !== undefined) {
          this.stateMachine.transition(SelectedDrawingMouseState.stateName);
        } else {
          const drawing = getHoveredDrawing(event.offsetX, event.offsetY, renderContext);
          store.setSelectedDrawing(drawing);
          if (drawing !== undefined) {
            const handle = getHoveredHandle(event.offsetX, event.offsetY, renderContext, drawing);
            store.setSelectedHandle(handle);
            if (handle !== undefined) {
              // this.stateMachine.transition(HoveringHandleMouseState.stateName);
            } else {
              this.stateMachine.transition(HoveringDrawingMouseState.stateName);
            }
          } else {
            this.stateMachine.transition(NeutralMouseState.stateName);
          }
        }
        break;
      }

      case MouseEventType.MouseDown: {
        this.stateMachine.transition(DragHandleMouseState.stateName);
        break;
      }
    }
  }
}
