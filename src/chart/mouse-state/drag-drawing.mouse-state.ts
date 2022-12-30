import { useChartStore } from "@/store/chart.store";
import { RenderContext } from "../renderer";
import { MouseEventType, MouseState } from "./mouse-state";
import { MouseStateMachine } from "./mouse-state-machine";
import { handleChoices } from "./state-utils";

export class DragDrawingMouseState implements MouseState {
  static readonly stateName = "DragDrawing";

  constructor(readonly stateMachine: MouseStateMachine) { }

  getStateName(): string {
    return DragDrawingMouseState.stateName;
  }

  trigger(eventType: MouseEventType, event: MouseEvent, renderContext: RenderContext) {
    switch (eventType) {
      case MouseEventType.MouseMove: {
        const store = useChartStore();
        const deltaX = renderContext.domainAxis.toChart(0) - renderContext.domainAxis.toChart(event.movementX);
        const deltaY = renderContext.rangeAxis.toChart(0) - renderContext.rangeAxis.toChart(event.movementY);
        store.hoveredDrawing!!.move(-deltaX, deltaY);
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
