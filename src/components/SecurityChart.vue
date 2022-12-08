<template>
  <div class="security-chart">
    <div class="chart-container"  :style="{ height: `${chartHeight}px` }">
      <div class="chart-panel-container">
        <ChartPane v-for="renderer in chartRenderers" :renderer="renderer"></ChartPane>
      </div>
      <ChartDatePane></ChartDatePane>
    </div>
    <ChartScrollbar></ChartScrollbar>
  </div>
</template>

<script lang="ts">
import { sumBy } from "lodash";
import { useChartStore } from "../store/chart-store";
import { computed, defineComponent } from "vue";
import { DATE_PANE_HEIGHT } from "./chart/chart.constants";
import ChartDatePane from "./chart/ChartDatePane.vue";
import ChartPane from "./chart/ChartPane.vue";
import ChartScrollbar from "./chart/ChartScrollbar.vue";

export default defineComponent({
  name: "SecurityChart",

  components: { ChartScrollbar, ChartDatePane, ChartPane },

  setup() {
    const store = useChartStore();
    const chartRenderers = computed(() => store.chartRenderers);
    const chartHeight = computed(() => sumBy(chartRenderers.value, (it) => it.getHeight()) + DATE_PANE_HEIGHT);

    return { chartRenderers, chartHeight };
  },
});
</script>

<style lang="scss" scoped>
.security-chart {
  border: 1px solid black;

  .chart-container {
    position: relative;
    // height: 400px;

    .chart-panel-container {
    }
  }
}
</style>
