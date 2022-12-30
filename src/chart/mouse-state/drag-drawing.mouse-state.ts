import { useChartStore } from "@/store/chart.store";
import { RenderContext } from "../renderer";
import { MouseState, MouseEventType } from "./mouse-state";
import { MouseStateMachine } from "./mouse-state-machine";
import { NeutralMouseState } from "./neutral.mouse-state";
import { SelectedDrawingMouseState } from "./selected-drawing.mouse-state";


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
        store.selectedDrawing!!.move(-deltaX, deltaY);
        store.setForceRender();
        break;
      }

      case MouseEventType.MouseUp: {
        this.stateMachine.transition(SelectedDrawingMouseState.stateName);
      }
    }
  }
}
