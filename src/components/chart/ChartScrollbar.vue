<template>
  <div class="chart-scrollbar-container">
    <div class="chart-scrollbar" ref="scrollbar">
      <div class="chart-scrollbar-panel" ref="scrollbarPanel" :style="{left: `${leftHandlePos}px`, width: `${rightHandlePos - leftHandlePos}px`}" v-draggable:center="dragInfo">
        <div class="handle left" v-draggable:left="dragInfo"></div>
        <div class="handle right" v-draggable:right="dragInfo"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useChartStore } from "../../store/chart-store";
import { defineComponent, onMounted, ref } from "vue";

export type ScrollLimits = {
  left: number;
  right: number;
}

export default defineComponent({
  name: "ChartScrollbar",

  setup() {
    const scrollbar = ref<HTMLDivElement>();
    const scrollbarPanel = ref<HTMLDivElement>();

    let elementOrig: number;
    const dragStarted = (handle: string) => {
      switch (handle) {
        case "left":
        case "center": {
          elementOrig = scrollbarPanel.value!!.offsetLeft;
          break;
        }
        case "right": {
          elementOrig = scrollbarPanel.value!!.offsetLeft + scrollbarPanel.value!!.offsetWidth;
          break;
        }
      }
    };

    const dragged = (offsetX: number, offsetY: number, origX: number, origY: number, event: MouseEvent, handle: string) => {
      switch (handle) {
        case "left": {
          if (elementOrig + offsetX > 0) {
            if (rightHandlePos.value - (elementOrig + offsetX) > 50) {
              updateScrolls(elementOrig + offsetX, undefined);
            } else {
              const delta = elementOrig + offsetX - leftHandlePos.value;
              if (rightHandlePos.value + delta < scrollbar.value!!.offsetWidth) {
                updateScrolls(elementOrig + offsetX, rightHandlePos.value + delta);
              } else {
                updateScrolls(scrollbar.value!!.offsetWidth - 50, scrollbar.value!!.offsetWidth);
              }
            }
          } else {
            updateScrolls(0, undefined);
          }
          break;
        }

        case "center": {
          const width = scrollbarPanel.value!!.offsetWidth;
          if (elementOrig + offsetX < 0) {
            updateScrolls(0, width);
          } else if (elementOrig + offsetX + width > scrollbar.value!!.offsetWidth) {
            updateScrolls(scrollbar.value!!.offsetWidth - width, scrollbar.value!!.offsetWidth);
          } else {
            updateScrolls(elementOrig + offsetX, elementOrig + offsetX + width);
          }
          break;
        }
        case "right": {
          if (elementOrig + offsetX < scrollbar.value!!.offsetWidth) {
            if (elementOrig + offsetX - leftHandlePos.value > 50) {
              updateScrolls(undefined, elementOrig + offsetX)
            } else {
              const delta = rightHandlePos.value - (elementOrig + offsetX)
              console.log(leftHandlePos.value - delta);
              if (leftHandlePos.value - delta > 0) {
                updateScrolls(leftHandlePos.value - delta, elementOrig + offsetX);
              } else {
                updateScrolls(0, 50);
              }
            }
          } else {
            updateScrolls(undefined, scrollbar.value!!.offsetWidth);
          }
          break;
        }
      }
    }

    const updateScrolls = (leftScroll: number | undefined, rightScroll: number | undefined) => {
      const store = useChartStore();
      const lastLeftScroll = store.scrollLeft;
      const lastRightScroll = store.scrollRight;
      if (leftScroll !== undefined) {
        leftHandlePos.value = leftScroll;
      }
      if (rightScroll !== undefined) {
        rightHandlePos.value = rightScroll;
      }
      if (lastLeftScroll !== leftHandlePos.value, lastRightScroll !== rightHandlePos.value) {
        const width = scrollbar.value!!.offsetWidth;
        store.setScroll(leftHandlePos.value / width, rightHandlePos.value / width);
      }
    }

    const leftHandlePos = ref(0);
    const rightHandlePos = ref(0);

    const dragInfo = { dragStarted, dragged }

    onMounted(() => {
      rightHandlePos.value = scrollbar.value!!.offsetWidth;
    });

    return { dragInfo, leftHandlePos, rightHandlePos, scrollbar, scrollbarPanel, onMounted };
  },
});
</script>

<style lang="scss" scoped>

.chart-scrollbar-container {
  margin: 2px 1px;

  .chart-scrollbar {
    height: 20px;
    width: 100%;
    position: relative;
    min-height: 11px;

    .chart-scrollbar-panel {
      position: absolute;
      background-color: #bdbdbd;
      height: 100%;
      padding: 0 5px;
      box-sizing: border-box;

      .handle {
        position: absolute;
        width: 6px;
        background-color: gray;
        height: 100%;

        &.left {
          left: 0;
          cursor: w-resize;
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
