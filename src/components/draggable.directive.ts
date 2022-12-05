import { DirectiveBinding } from "vue";

export type Position = {
  x: number;
  y: number;
};

let dragging = false;
let origX = 0;
let origY = 0;

const dragStart = (event: MouseEvent, binding: DirectiveBinding) => {
  dragging = true;
  origX = event.x;
  origY = event.y;
  event.preventDefault();
  if (binding.value.dragAllowed?.() ?? true) {
    event.stopPropagation();
  }
  binding.value.dragStarted(binding.arg);

  document.onmousemove = (event) => {
    drag(event, binding);
  };
  document.onmouseup = (event) => {
    dragEnd(event, binding);
  };
};

const dragEnd = (event: MouseEvent, binding: DirectiveBinding) => {
  dragging = false;
  event.preventDefault();
  event.stopPropagation();
  binding.value.dragEnded(binding.arg);
};

const drag = (event: MouseEvent, binding: DirectiveBinding) => {
  if (dragging) {
    const offsetX = event.x - origX;
    const offsetY = event.y - origY;
    binding.value.dragged(offsetX, offsetY, origX, origY, event, binding.arg);
    // deltaX = event.x - lastPosX;
    // deltaY = event.y - lastPosY;
    // lastPosX = event.x;
    // lastPosY = event.y;

    // binding.value.dragged(deltaX, deltaY, event, binding.arg);
  }
};

export default {
  created: (el: HTMLElement) => {
    el.draggable = true;
  },

  mounted: (el: HTMLElement, binding: DirectiveBinding) => {
    el.onmousedown = (event) => dragStart(event, binding);
  },
};
