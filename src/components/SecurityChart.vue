<template>
  <div class="security-chart">
    <div class="chart-container">
      <ChartDatePane></ChartDatePane>
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
import { defineComponent, onMounted, ref } from "vue";
import ChartScrollbar from "./chart/ChartScrollbar.vue"
import ChartDatePane from "./chart/ChartDatePane.vue"

type ChartPanel = {};

export default defineComponent({
  name: "SecurityChart",

  components: { ChartScrollbar, ChartDatePane },

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
    height: 400px;

    .date-panel {

    }
  }


}
</style>
