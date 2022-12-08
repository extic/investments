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
import { useChartStore } from "@/store/chart-store";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  name: "ChartScrollbar",

  setup() {
    const scrollbar = ref<HTMLDivElement>();
    const scrollbarPanel = ref<HTMLDivElement>();
    const disableWatch = ref(false);
    const leftHandlePos = ref(0);
    const rightHandlePos = ref(0);
    const store = useChartStore();

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
            if (rightHandlePos.value - (elementOrig + offsetX) >= 50) {
              updateScrolls(elementOrig + offsetX, rightHandlePos.value);
            } else {
              const delta = elementOrig + offsetX - leftHandlePos.value;
              if (rightHandlePos.value + delta < scrollbar.value!!.offsetWidth) {
                updateScrolls(elementOrig + offsetX, rightHandlePos.value + delta);
              } else {
                updateScrolls(scrollbar.value!!.offsetWidth - 50, scrollbar.value!!.offsetWidth);
              }
            }
          } else {
            updateScrolls(0, rightHandlePos.value);
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
            if (elementOrig + offsetX - leftHandlePos.value >= 50) {
              updateScrolls(leftHandlePos.value, elementOrig + offsetX);
            } else {
              const delta = rightHandlePos.value - (elementOrig + offsetX);
              if (leftHandlePos.value - delta > 0) {
                updateScrolls(leftHandlePos.value - delta, elementOrig + offsetX);
              } else {
                updateScrolls(0, 50);
              }
            }
          } else {
            updateScrolls(leftHandlePos.value, scrollbar.value!!.offsetWidth);
          }
          break;
        }
      }
    };

    const updateScrolls = (leftScroll: number, rightScroll: number) => {
      const lastLeftScroll = leftHandlePos.value;
      const lastRightScroll = rightHandlePos.value;
      leftHandlePos.value = leftScroll;
      rightHandlePos.value = rightScroll;

      if (lastLeftScroll !== leftScroll || lastRightScroll !== rightScroll) {
        const scrollPosition = leftHandlePos.value!! / (scrollbar.value!!.offsetWidth - 50);
        const scrollLength = (rightHandlePos.value!! - leftHandlePos.value!! - 50) / (scrollbar.value!!.offsetWidth - 50);

        // console.log(scrollPosition, scrollLength);

        store.setScroll(scrollPosition, scrollLength);
      }
    };

    const initScrolls = () => {
      console.log("init");
      leftHandlePos.value = store.scrollPosition * scrollbar.value!!.offsetWidth;
      rightHandlePos.value = leftHandlePos.value + store.scrollLength * scrollbar.value!!.offsetWidth;
    };

    watch(
      () => [store.scrollPosition, store.scrollLength],
      () => {
        if (!disableWatch.value) {
          initScrolls();
        }
      }
    );

    onMounted(() => {
      initScrolls();
    });

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
