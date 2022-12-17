<template>
  <div class="security-chart">
    <div class="chart-container" :style="{ height: `${chartHeight}px` }">
      <div class="chart-panel-container" ref="chartPanelContainer">
        <div v-for="(renderer, index) in chartRenderers">
          <div v-if="(index !== 0)" class="separator"></div>
          <ChartPane :renderer="renderer"></ChartPane>
        </div>
      </div>
      <ChartDatePane></ChartDatePane>
    </div>
    <ChartScrollbar></ChartScrollbar>
  </div>
</template>

<script lang="ts">
import { sumBy } from "lodash";
import { useChartStore } from "../store/chart.store";
import { computed, defineComponent, onMounted, ref } from "vue";
import { DATE_PANE_HEIGHT } from "./chart/chart.constants";
import ChartDatePane from "./chart/ChartDatePane.vue";
import ChartPane from "./chart/ChartPane.vue";
import ChartScrollbar from "./chart/ChartScrollbar.vue";
import { nextTick } from "process";

export default defineComponent({
  name: "SecurityChart",

  components: { ChartScrollbar, ChartDatePane, ChartPane },

  setup() {
    const store = useChartStore();
    const chartRenderers = computed(() => store.chartRenderers);
    const chartHeight = computed(() => sumBy(chartRenderers.value, (it) => it.getHeight()) + DATE_PANE_HEIGHT);
    const chartPanelContainer = ref<HTMLDivElement>();

    onMounted(() => {
      store.setChartWidth(chartPanelContainer.value!!.offsetWidth);
    })

    return { chartRenderers, chartHeight, chartPanelContainer };
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
      .separator {
        border-top: 1px solid lightgray;
      }
    }
  }
}
</style>
