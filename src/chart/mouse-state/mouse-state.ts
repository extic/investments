import { RenderContext } from "../renderer";
import { MouseStateMachine } from "./mouse-state-machine";

export enum MouseEventType {
  MouseWheel,
  MouseDown,
  MouseUp,
  MouseMove,
}

export interface MouseState {
  readonly stateMachine: MouseStateMachine

  getStateName(): string;
  trigger(eventType: MouseEventType, event: MouseEvent, renderContext: RenderContext): void;
}


