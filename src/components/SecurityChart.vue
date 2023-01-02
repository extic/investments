<template>
  <div class="chart-container" ref="chartContainer">
    <!-- <div class="control-panel">
      <button @click="toggleDrawMode">{{ drawMode ? 'Draw' : 'View' }}</button>
      <button @click="addDrawing">Add Drawing</button>
      <button @click="save">Save</button>
    </div> -->
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
import { createDomainContext } from "@/chart/domain-context-calculator";
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import { useChartStore } from "../store/chart.store";
import ChartDatePane from "./chart/ChartDatePane.vue";
import ChartPane from "./chart/ChartPane.vue";
import ChartScrollbar from "./chart/ChartScrollbar.vue";
import { LineDrawing } from "@/chart/drawings/line.drawing";
import { DrawingData, saveDrawingsDataFile } from "@/services/db/security-data.db.service";

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
        const domainContext = createDomainContext(store.fromPos, store.toPos, store.canvasWidth, store.quotes);
        store.setDomainContext(domainContext);
    });

    const drawMode = computed(() => {
      return store.drawMode;
    });

    const toggleDrawMode = () => {
      store.toggleDrawMode();
    };

    const addDrawing = () => {
      const store = useChartStore();
      const drawing = new LineDrawing("main", {
        handles: [{
          x: 1,
          y: 65000,
        },
        {
          x: 102,
          y: 65000,
        }]
      });
      store.addDrawing(drawing);
    };

    const save = () => {
      const store = useChartStore();
      const drawingsData = store.drawings.map((it) => {
        return {
          type: it.type,
          chartName: it.chartName,
          data: it.data,
        } as DrawingData
      });
      saveDrawingsDataFile(store.selectedSecurity!!.number, drawingsData);
    };


    onMounted(() => {
      const canvasWidth = chartPanelContainer.value!!.offsetWidth;
      store.setCanvasWidth(canvasWidth);
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
      flex-shrink: 0;
      background-color: lightgray;
      border-top: 1px solid gray;
      box-sizing: border-box;
      // height: 1px;
    }
  }
}
</style>
