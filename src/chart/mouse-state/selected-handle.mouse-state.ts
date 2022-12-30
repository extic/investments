import { useChartStore } from "@/store/chart.store";
import { RenderContext } from "../renderer";
import { MouseState, MouseEventType } from "./mouse-state";
import { MouseStateMachine } from "./mouse-state-machine";
import { NeutralMouseState } from "./neutral.mouse-state";
import { getHoveredHandle } from "./state-utils";


export class SelectedHandleMouseState implements MouseState {
  static readonly stateName = "SelectedHandle";

  constructor(readonly stateMachine: MouseStateMachine) { }

  getStateName(): string {
    return SelectedHandleMouseState.stateName;
  }

  trigger(eventType: MouseEventType, event: MouseEvent, renderContext: RenderContext) {
    // switch (eventType) {
    //   case MouseEventType.MouseDown: {
    //     const drawing = getHoveredDrawing(event.offsetX, event.offsetY, renderContext);
    //     if (drawing !== undefined) {
    //       const store = useChartStore();
    //       store.setSelectedDrawing(drawing);
    //       this.stateMachine.transition(DragDrawingMouseState.stateName);
    //     } else {
    //       this.stateMachine.transition(NeutralMouseState.stateName);
    //     }
    //   }

    //   case MouseEventType.MouseMove: {
    //     const store = useChartStore();
    //     const handle = getHoveredHandle(event.offsetX, event.offsetY, renderContext, store.selectedDrawing!!);
    //     if (handle !== undefined) {
    //       store.setSelectedHandle(handle);
    //       this.stateMachine.transition(HoveringHandleMouseState.stateName);
    //     }
    //   }
    // }
  }
}
