import { RenderContext } from "../renderer";
import { DragChartMouseState } from "./drag-chart.mouse-state";
import { DragDrawingMouseState } from "./drag-drawing.mouse-state";
import { DragHandleMouseState } from "./drag-handle.mouse-state";
import { HoveringDrawingMouseState } from "./hovering-drawing.mouse-state";
import { HoveringHandleMouseState } from "./hovering-handle.mouse-state";
import { MouseEventType, MouseState } from "./mouse-state";
import { NeutralMouseState } from "./neutral.mouse-state";


export class MouseStateMachine {
  private readonly states = new Map<string, MouseState>();

  private currState: MouseState;

  constructor() {
    this.addState(new NeutralMouseState(this));
    this.addState(new DragChartMouseState(this));
    this.addState(new HoveringDrawingMouseState(this));
    this.addState(new HoveringHandleMouseState(this));
    this.addState(new DragDrawingMouseState(this));
    this.addState(new DragHandleMouseState(this));

    this.currState = this.states.get(NeutralMouseState.stateName)!!;
  }

  currentStateName(): string {
    return this.currState.getStateName();
  }

  trigger(eventType: MouseEventType, event: MouseEvent, renderContext: RenderContext) {
    console.log(`${this.currState.getStateName()}: triggering ${MouseEventType[eventType]}`)
    this.currState.trigger(eventType, event, renderContext);
  }

  transition(toStateName: string) {
    console.log(`${this.currState.getStateName()}: transitioning to ${toStateName}`)
    this.currState = this.states.get(toStateName)!!;
  }

  private addState(state: MouseState) {
    this.states.set(state.getStateName(), state);
  }
}
