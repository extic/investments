import { useChartStore } from "@/store/chart.store";
import { RenderContext } from "../renderer";
import { DragChartMouseState } from "./drag-chart.mouse-state";
import { MouseEventType, MouseState } from "./mouse-state";
import { MouseStateMachine } from "./mouse-state-machine";
import { handleChoices } from "./state-utils";

export class NeutralMouseState implements MouseState {
  static readonly stateName = "Neutral";

  constructor(readonly stateMachine: MouseStateMachine) {}

  getStateName(): string {
    return NeutralMouseState.stateName;
  }

  trigger(eventType: MouseEventType, event: MouseEvent, renderContext: RenderContext) {
    switch (eventType) {
      case MouseEventType.MouseWheel: {
        const store = useChartStore();
        const delta = (store.toPos - store.fromPos) / 30;
        const direction = (event as WheelEvent).deltaY > 0 ? delta : -delta;
        const newFromPos = store.fromPos + (event.shiftKey ? direction : -direction);
        const newToPos = store.toPos + (event.shiftKey ? direction : direction);
        store.setPositions(newFromPos, newToPos);
        break;
      }

      case MouseEventType.MouseDown: {
        this.stateMachine.transition(DragChartMouseState.stateName);
        break;
      }

      case MouseEventType.MouseMove: {
        handleChoices(event, renderContext, this.stateMachine);
        break;
      }
    }
  }
}
