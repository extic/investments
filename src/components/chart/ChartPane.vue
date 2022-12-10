<template>
  <div class="chart-pane" ref="pane" :style="{ height: `${paneHeight}px` }">
    <div class="chart-title">
      <div>הפועלים</div>
    </div>
    <canvas ref="canvas" :width="paneWidth" :height="paneHeight"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import { ChartRenderer } from "@/chart/chart.renderer";
import { useChartStore } from "@/store/chart.store";
import { nextTick } from "process";

export default defineComponent({
  name: "ChartPane",

  props: {
    renderer: {
      type: Object as PropType<ChartRenderer>,
    }
  },

  setup(props) {
    const pane = ref<HTMLDivElement>();
    const paneWidth = ref(0);
    const paneHeight = ref(0);
    const canvas = ref<HTMLCanvasElement>();
    const store = useChartStore();

    watch(
      () => [store.startIndex, store.endIndex],
      ([newStartIndex, newEndIndex]) => {
        const ctx = canvas.value!!.getContext("2d")!!;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        ctx.strokeStyle = "lightgray";
        ctx.beginPath();
        for (let i=0; i<(newEndIndex - newStartIndex); i += 5) {
          const pos = Math.round(ctx.canvas.width - i * store.quoteWidth - store.quoteWidth / 2);
          ctx.moveTo(pos, 0);
          ctx.lineTo(pos, ctx.canvas.height);
        }
        ctx.closePath();
        ctx.stroke();

        props.renderer!!.paint(ctx, newStartIndex, newEndIndex, store.quoteWidth);
      }
    );

    onMounted(() => {
      paneWidth.value = pane.value!!.offsetWidth;
      store.setChartWidth(paneWidth.value);
      paneHeight.value = props.renderer!!.getHeight();
      const ctx = canvas.value!!.getContext("2d")!!;
      nextTick(() => {
        ctx.translate(-0.5, -0.5);
      });
    });

    return { paneWidth, paneHeight, pane, canvas };
  },
});
</script>

<style lang="scss" scoped>
.chart-pane {
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
