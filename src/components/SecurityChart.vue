<template>
  <div class="chart-container" ref="chartContainer">
    <div class="chart-pane-container" ref="chartPanelContainer">
      <template v-for="(chart, index) in charts">
        <div v-if="(index !== 0)" class="separator"></div>
        <ChartPane class="chart-pane" :style="{height: `${calcHeight(chart, index !== charts.length - 1)}`}" :chart="chart"></ChartPane>
      </template>
    </div>
    <ChartDatePane></ChartDatePane>
  </div>
  <!-- <ChartScrollbar></ChartScrollbar> -->
</template>

<script lang="ts">
import { Chart } from "@/chart/chart";
import { createRenderContext } from "@/chart/render-context-calculator";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useChartStore } from "../store/chart.store";
import ChartDatePane from "./chart/ChartDatePane.vue";
import ChartPane from "./chart/ChartPane.vue";
import ChartScrollbar from "./chart/ChartScrollbar.vue";

export default defineComponent({
  name: "SecurityChart",

  components: { ChartScrollbar, ChartDatePane, ChartPane },

  setup() {
    const store = useChartStore();
    const charts = computed(() => store.charts);
    const chartContainer = ref<HTMLDivElement>();
    const chartPanelContainer = ref<HTMLDivElement>();

    const calcHeight = (chart: Chart, isLast: boolean) => {
      return `calc(${chart.heightRatio * 100}% - ${isLast ? 0 : (charts.value.length - 1) * 5}px`;
    };

    watch(
      () => [store.fromPos, store.toPos],
      () => {
        const renderContext = createRenderContext(store.fromPos, store.toPos, store.chartWidth, store.securityData);
        store.setRenderContext(renderContext);
    });

    onMounted(() => {
      const chartWidth = chartPanelContainer.value!!.offsetWidth;
      store.setChartWidth(chartWidth);
    })

    return { chartPanelContainer, chartContainer, charts, calcHeight };
  },
});
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .chart-pane-container {
    width: 100%;
    height: calc(100% - 21px);
    display: flex;
    flex-direction: column;

    .separator {
      border-bottom: 1px solid gray;
      height: 5px;
      background-color: lightgray;
      border-top: 1px solid gray;
      box-sizing: border-box;
      // height: 1px;
    }
  }
}
</style>
