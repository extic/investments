<template>
  <div class="chart-scrollbar-container">
    <div class="chart-scrollbar" ref="scrollbar">
      <div
        class="chart-scrollbar-panel"
        ref="scrollbarPanel"
        :style="{ left: `${leftHandlePos}px`, width: `${rightHandlePos - leftHandlePos}px` }"
        v-draggable:center="dragInfo"
      >
        <div class="handle left" v-draggable:left="dragInfo"></div>
        <div class="handle right" v-draggable:right="dragInfo"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useChartStore } from "../../store/chart-store";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "ChartScrollbar",

  setup() {
    const scrollbar = ref<HTMLDivElement>();
    const scrollbarPanel = ref<HTMLDivElement>();
    const disableWatch = ref(false);
    const leftHandlePos = ref(0);
    const rightHandlePos = ref(0);

    let elementOrig: number;
    const dragStarted = (handle: string) => {
      disableWatch.value = true;
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

    const dragEnded = (handle: string) => {
      disableWatch.value = false;
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
              updateScrolls(undefined, elementOrig + offsetX);
            } else {
              const delta = rightHandlePos.value - (elementOrig + offsetX);
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
    };

    const store = useChartStore();

    const updateScrolls = (leftScroll: number | undefined, rightScroll: number | undefined) => {
      const lastLeftScroll = leftHandlePos.value;
      const lastRightScroll = rightHandlePos.value;
      if (leftScroll !== undefined) {
        leftHandlePos.value = leftScroll;
      }
      if (rightScroll !== undefined) {
        rightHandlePos.value = rightScroll;
      }

      if (lastLeftScroll !== leftScroll || lastRightScroll !== rightScroll) {
        const width = scrollbar.value!!.offsetWidth;
        const startIndex = Math.floor((leftHandlePos.value / width) * store.securityData.length);
        const endIndex = Math.floor((rightHandlePos.value / width) * store.securityData.length - 1);
        const quoteWidth = scrollbar.value!!.offsetWidth / (store.endIndex - store.startIndex);
        store.setIndexes(startIndex, endIndex, quoteWidth);
      }
    };

    watch(
      () => [store.startIndex, store.endIndex],
      ([newStartIndex, newEndIndex]) => {
        if (!disableWatch.value) {
          leftHandlePos.value = (newStartIndex / store.securityData.length) * scrollbar.value!!.offsetWidth;
          rightHandlePos.value = (newEndIndex / store.securityData.length) * scrollbar.value!!.offsetWidth;
        }
      }
    );

    const dragInfo = { dragStarted, dragEnded, dragged };

    return { dragInfo, leftHandlePos, rightHandlePos, scrollbar, scrollbarPanel, disableWatch };
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
