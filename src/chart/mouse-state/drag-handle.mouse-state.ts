import { useChartStore } from "@/store/chart.store";
import { RenderContext } from "../renderer";
import { MouseEventType, MouseState } from "./mouse-state";
import { MouseStateMachine } from "./mouse-state-machine";
import { handleChoices } from "./state-utils";

export class DragHandleMouseState implements MouseState {
  static readonly stateName = "DragHandle";

  constructor(readonly stateMachine: MouseStateMachine) { }

  getStateName(): string {
    return DragHandleMouseState.stateName;
  }

  trigger(eventType: MouseEventType, event: MouseEvent, renderContext: RenderContext) {
    switch (eventType) {
      case MouseEventType.MouseMove: {
        const store = useChartStore();
        const deltaX = renderContext.domainAxis.toChart(0) - renderContext.domainAxis.toChart(event.movementX);
        const deltaY = renderContext.rangeAxis.toChart(0) - renderContext.rangeAxis.toChart(event.movementY);
        store.hoveredDrawing!!.moveHandle(-deltaX, deltaY, store.hoveredHandle!!);
        store.setForceRender();
        break;
      }

      case MouseEventType.MouseUp: {
        handleChoices(event, renderContext, this.stateMachine);
        break;
      }
    }
  }
}
