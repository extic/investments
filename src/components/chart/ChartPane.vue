<template>
  <div class="chart-pane" ref="pane">
    <!-- <div class="chart-title">
      <div>הפועלים</div>
    </div> -->
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import { ChartRenderer } from "@/chart/chart.renderer";
import { useChartStore } from "@/store/chart.store";
import { nextTick } from "process";
import { Chart } from "@/chart/chart";

export default defineComponent({
  name: "ChartPane",

  props: {
    chart: {
      type: Object as PropType<Chart>,
    }
  },

  setup(props) {
    const pane = ref<HTMLDivElement>();
    const paneWidth = ref(0);
    const paneHeight = ref(0);
    const canvas = ref<HTMLCanvasElement>();
    const store = useChartStore();
    const chart = props.chart!!;

    onMounted(() => {
      canvas.value!!.width = pane.value!!.offsetWidth;
      canvas.value!!.height = pane.value!!.offsetHeight;
      const ctx = canvas.value!!.getContext("2d")!!;
      ctx.translate(0.5, 0.5);
    });

    watch(
      () => [store.renderContext],
      () => {
        const ctx = canvas.value!!.getContext("2d")!!;


    //     // paneWidth.value = store.chartWidth;
    //     paneHeight.value = props.renderer!!.getHeight();
    //     ctx.canvas.width = store.chartWidth;
    //     ctx.canvas.height = props.renderer!!.getHeight();
    //     ctx.translate(-0.5, -0.5);

        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //     ctx.strokeStyle = "lightgray";
    //     ctx.beginPath();
    //     for (let i=0; i<(store.endIndex - store.startIndex); i += 5) {
    //       const pos = Math.round(ctx.canvas.width - i * store.quoteWidth - store.quoteWidth / 2);
    //       ctx.moveTo(pos, 0);
    //       ctx.lineTo(pos, ctx.canvas.height);
    //     }
    //     ctx.closePath();
    //     ctx.stroke();

        // props.chart!!.renderers!!.paint(ctx, store.startIndex, store.endIndex, store.quoteWidth);
        props.chart!!.render(ctx);
    //   }
    });

    return { paneWidth, paneHeight, pane, canvas, chart };
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
  // // border: 1px solid #cccccc;
  // height: 21px;
  // position: absolute;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // direction: ltr;

  canvas {
    direction: ltr;
  }
  //   // width: 100%;
  //   // height: 100%;
  //   // position: absolute;
  //   // top: 0;
  //   // left: 0;
  //   // right: 0;
  //   // bottom: 0;
  // }
}
</style>
