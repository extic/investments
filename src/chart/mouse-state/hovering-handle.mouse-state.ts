import { RenderContext } from "../renderer";
import { DragHandleMouseState } from "./drag-handle.mouse-state";
import { MouseEventType, MouseState } from "./mouse-state";
import { MouseStateMachine } from "./mouse-state-machine";
import { handleChoices } from "./state-utils";

export class HoveringHandleMouseState implements MouseState {
  static readonly stateName = "HoveringHandle";

  constructor(readonly stateMachine: MouseStateMachine) {}

  getStateName(): string {
    return HoveringHandleMouseState.stateName;
  }

  trigger(eventType: MouseEventType, event: MouseEvent, renderContext: RenderContext) {
    switch (eventType) {
      case MouseEventType.MouseMove: {
        handleChoices(event, renderContext, this.stateMachine);
        break;
      }

      case MouseEventType.MouseDown: {
        this.stateMachine.transition(DragHandleMouseState.stateName);
        break;
      }
    }
  }
}
