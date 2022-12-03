<template>
  <div class="security-chart">
    <div class="chart-container">
      <div class="date-panel">
        <canvas></canvas>
      </div>
      <div class="chart-panel-container">
        <div class="chart-panel">
          <canvas></canvas>
        </div>
        <div class="chart-panel">
          <canvas></canvas>
        </div>
      </div>
    </div>
    <div class="chart-scrollbar" ref="scrollbar">
      <div class="chart-scrollbar-panel" ref="scrollbarPanel" :style="{left: `${leftHandlePos}px`, width: `${rightHandlePos - leftHandlePos}px`}" v-draggable:center="dragInfo">
        <div class="handle left" v-draggable:left="dragInfo"></div>
        <div class="handle right" v-draggable:right="dragInfo"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

type ChartPanel = {};

export default defineComponent({
  name: "SecurityChart",

  setup() {
    const panels: ChartPanel[] = [];
    const scrollbar = ref<HTMLDivElement>();
    const scrollbarPanel = ref<HTMLDivElement>();

    let elementOrig: number;
    const dragStarted = (handle: string) => {
      switch (handle) {
        case "left":
        case "center": {
          elementOrig = scrollbarPanel.value!!.offsetLeft;
          console.log("elementOrig", elementOrig)
          break;
        }
        case "right": {
          elementOrig = scrollbarPanel.value!!.offsetLeft + scrollbarPanel.value!!.offsetWidth;
          console.log("elementOrig", elementOrig)
          break;
        }
      }
    };

    const dragged = (offsetX: number, offsetY: number, origX: number, origY: number, event: MouseEvent, handle: string) => {
      switch (handle) {
        case "left": {
          if (elementOrig + offsetX > 0) {
            if (rightHandlePos.value - (elementOrig + offsetX) > 50) {
              leftHandlePos.value = elementOrig + offsetX;
            } else {
              const delta = elementOrig + offsetX - leftHandlePos.value;
              if (rightHandlePos.value + delta < scrollbar.value!!.offsetWidth) {
                leftHandlePos.value = elementOrig + offsetX;
                rightHandlePos.value += delta;
              } else {
                leftHandlePos.value = scrollbar.value!!.offsetWidth - 50;
                rightHandlePos.value = scrollbar.value!!.offsetWidth;
              }
            }
          } else {
            leftHandlePos.value = 0;
          }
          break;
        }

        case "center": {
          const width = scrollbarPanel.value!!.offsetWidth;
          if (elementOrig + offsetX < 0) {
            leftHandlePos.value = 0;
            rightHandlePos.value = width;
          } else if (elementOrig + offsetX + width > scrollbar.value!!.offsetWidth) {
            leftHandlePos.value = scrollbar.value!!.offsetWidth - width;
            rightHandlePos.value = scrollbar.value!!.offsetWidth;
          } else {
            leftHandlePos.value = elementOrig + offsetX;
            rightHandlePos.value = elementOrig + offsetX + width;
          }
          break;
        }
        case "right": {
          if (elementOrig + offsetX < scrollbar.value!!.offsetWidth) {
            if (elementOrig + offsetX - leftHandlePos.value > 50) {
              rightHandlePos.value = elementOrig + offsetX;
            } else {
              const delta = rightHandlePos.value - (elementOrig + offsetX)
              if (leftHandlePos.value - delta > 0) {
                rightHandlePos.value = elementOrig + offsetX;
                leftHandlePos.value -= delta;
              } else {
                rightHandlePos.value = 50;
                leftHandlePos.value = 0;
              }
            }
          } else {
            rightHandlePos.value = scrollbar.value!!.offsetWidth
          }
          break;
        }
      }
    }

    const dragAllowed = () => {
      return true;
    };

    const leftHandlePos = ref(40);
    const rightHandlePos = ref(400);

    const dragInfo = { dragStarted, dragged, dragAllowed }

    return { panels, dragInfo, leftHandlePos, rightHandlePos, scrollbar, scrollbarPanel };
  },
});
</script>

<style lang="scss" scoped>
.security-chart {
  border: 1px solid black;

  .chart-container {
    position: relative;

    .date-panel {
      border: 1px solid red;
      height: 21px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  .chart-scrollbar {
    height: 20px;
    width: 100%;
    // min-width: 50px;
    position: relative;
    min-height: 11px;
    margin: 2px 0;

    .chart-scrollbar-panel {
      position: absolute;
      background-color: #bdbdbd;
      height: 100%;

      .handle {
        position: absolute;
        width: 6px;
        background-color: gray;
        height: 100%;

        &.left {
          left: 0;
          cursor: w-resize;
          background-color: blue;
        }
        &.right {
          right: 0;
          cursor: e-resize;
        }
      }
    }
  }
}
</style>
