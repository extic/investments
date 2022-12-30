import { useChartStore } from "@/store/chart.store";
import { RenderContext } from "../renderer";
import { MouseState, MouseEventType } from "./mouse-state";
import { MouseStateMachine } from "./mouse-state-machine";
import { NeutralMouseState } from "./neutral.mouse-state";


export class DragChartMouseState implements MouseState {
  static readonly stateName = "DragChart";

  constructor(readonly stateMachine: MouseStateMachine) { }

  getStateName(): string {
    return DragChartMouseState.stateName;
  }

  trigger(eventType: MouseEventType, event: MouseEvent, renderContext: RenderContext) {
    switch (eventType) {
      case MouseEventType.MouseMove: {
        const store = useChartStore();
        const delta = renderContext.domainAxis.toChart(0) - renderContext.domainAxis.toChart(event.movementX);
        const newFromPos = store.fromPos + delta;
        const newToPos = store.toPos + delta;
        store.setPositions(newFromPos, newToPos);
        break;
      }

      case MouseEventType.MouseUp: {
        this.stateMachine.transition(NeutralMouseState.stateName);
      }
    }
  }
}
