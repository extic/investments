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
    <ChartScrollbar></ChartScrollbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ChartScrollbar from "./chart/ChartScrollbar.vue"

type ChartPanel = {};

export default defineComponent({
  name: "SecurityChart",

  components: { ChartScrollbar },

  setup() {
    const panels: ChartPanel[] = [];
    return { panels };
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
