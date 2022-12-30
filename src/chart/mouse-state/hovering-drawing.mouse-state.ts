import { RenderContext } from "../renderer";
import { DragDrawingMouseState } from "./drag-drawing.mouse-state";
import { MouseEventType, MouseState } from "./mouse-state";
import { MouseStateMachine } from "./mouse-state-machine";
import { handleChoices } from "./state-utils";

export class HoveringDrawingMouseState implements MouseState {
  static readonly stateName = "HoveringDrawing";

  constructor(readonly stateMachine: MouseStateMachine) {}

  getStateName(): string {
    return HoveringDrawingMouseState.stateName;
  }

  trigger(eventType: MouseEventType, event: MouseEvent, renderContext: RenderContext) {
    switch (eventType) {
      case MouseEventType.MouseMove: {
        handleChoices(event, renderContext, this.stateMachine);
        break;
      }

      case MouseEventType.MouseDown: {
        this.stateMachine.transition(DragDrawingMouseState.stateName);
        break;
      }
    }
  }
}
