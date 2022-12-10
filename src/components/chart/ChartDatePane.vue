<template>
  <div class="chart-date-pane" ref="pane">
    <canvas ref="canvas" :width="width" :height="DATE_PANE_HEIGHT"></canvas>
  </div>
</template>

<script lang="ts">
import { useChartStore } from "../../store/chart.store";
import { defineComponent, nextTick, onMounted, ref, watch } from "vue";
import { DATE_PANE_HEIGHT } from "./chart.constants";

export default defineComponent({
  name: "ChartDatePane",

  setup() {
    const pane = ref<HTMLDivElement>();
    const width = ref(0);
    const canvas = ref<HTMLCanvasElement>();
    const store = useChartStore();

    onMounted(() => {
      const ctx = canvas.value!!.getContext("2d")!!;
      width.value = pane.value!!.offsetWidth;
      nextTick(() => {
        ctx.translate(0.5, 0.5);
        repaint(ctx);
      });

      watch(
        () => [store.startIndex, store.endIndex, store.quoteWidth],
        () => {
          repaint(ctx);
        }
      );
    });

    const calcTextInterval = (width: number) => {
      if (width > 120) {
        return 1;
      }
      if (width > 50) {
        return 2;
      }
      if (width > 25) {
        return 4;
      }
      if (width > 18) {
        return 5;
      }
      if (width > 15) {
        return 7;
      }
      if (width > 10) {
        return 9;
      }
      return 14;
    };

    const repaint = (ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, canvas.value!!.width, canvas.value!!.height);

      ctx.strokeStyle = "#cccccc";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(canvas.value!!.width, 0);
      ctx.closePath();
      ctx.stroke();

      const data = store.securityData;
      const quoteWidth = store.quoteWidth;
      const textInterval = calcTextInterval(quoteWidth);

      ctx.strokeStyle = "#cccccc";
      ctx.font = "11px helvetica";
      ctx.beginPath();

      let pos = canvas.value!!.width - quoteWidth / 2;
      for (let i = store.endIndex - 1; i >= store.startIndex; i--) {
        const roundedPos = Math.round(pos)
        ctx.moveTo(roundedPos, 0);
        ctx.lineTo(roundedPos, 5);

        if (i % textInterval === 0) {
          const text = data[i].tradeDate
          const metrics = ctx.measureText(text);
          ctx.fillText(text, pos - metrics.width / 2, 17);
        }

        pos -= quoteWidth;
      }
      ctx.closePath();
      ctx.stroke();
    };

    return { onMounted, pane, canvas, width, DATE_PANE_HEIGHT };
  },
});
</script>

<style lang="scss" scoped>
.chart-date-pane {
  height: 21px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  direction: ltr;
}
</style>
