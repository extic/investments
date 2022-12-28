<template>
  <div class="chart-pane" ref="pane">
    <!-- <div class="chart-title">
      <div>הפועלים</div>
    </div> -->
    <canvas ref="canvas" @wheel="wheelMoved" @mousemove="mouseMoved"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import { useChartStore } from "@/store/chart.store";
import { Chart } from "@/chart/chart";

export default defineComponent({
  name: "ChartPane",

  props: {
    chart: {
      type: Object as PropType<Chart>,
    },
  },

  setup(props) {
    const pane = ref<HTMLDivElement>();
    const paneWidth = ref(0);
    const paneHeight = ref(0);
    const canvas = ref<HTMLCanvasElement>();
    const store = useChartStore();
    const chart = props.chart!!;

    const wheelMoved = (event: WheelEvent) => {
      const delta = (store.toPos - store.fromPos) / 30;
      const direction = event.deltaY > 0 ? delta : -delta;
      const newFromPos = store.fromPos + (event.shiftKey ? direction : -direction);
      const newToPos = store.toPos + (event.shiftKey ? direction : direction);
      store.setPositions(newFromPos, newToPos);
    };

    const mouseMoved = (event: MouseEvent) => {
      const ctx = canvas.value!!.getContext("2d")!!;
      chart.mouseMoved(event, ctx);
      render();
    };

    onMounted(() => {
      canvas.value!!.width = pane.value!!.offsetWidth;
      canvas.value!!.height = pane.value!!.offsetHeight;

      render();
    });

    const render = () => {
      // console.time("Render");
      const ctx = canvas.value!!.getContext("2d")!!;
      props.chart!!.render(ctx);
      // console.timeEnd("Render");
    };

    watch(
      () => [store.domainContext],
      () => {
        render();
      }
    );

    return { paneWidth, paneHeight, pane, canvas, chart, wheelMoved, mouseMoved };
  },
});
</script>

<style lang="scss" scoped>
.chart-pane {
  // border: 1px solid red;
  position: relative;
  .chart-title {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: 2px;
    text-align: left;
  }

  canvas {
    direction: ltr;
  }
}
</style>
