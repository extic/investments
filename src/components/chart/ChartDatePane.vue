<template>
  <div class="chart-date-pane" ref="pane">
    <canvas ref="canvas" :width="width" :height="DATE_PANE_HEIGHT"></canvas>
  </div>
</template>

<script lang="ts">
import { DomainContext, useChartStore } from "../../store/chart.store";
import { defineComponent, nextTick, onMounted, ref, watch } from "vue";
import { DATE_PANE_HEIGHT } from "./chart.constants";
import { lastIndexOf } from "lodash";

export default defineComponent({
  name: "ChartDatePane",

  setup() {
    const pane = ref<HTMLDivElement>();
    const width = ref(0);
    const canvas = ref<HTMLCanvasElement>();
    const store = useChartStore();

    onMounted(() => {
      canvas.value!!.width = pane.value!!.offsetWidth;
      canvas.value!!.height = pane.value!!.offsetHeight;
      const ctx = canvas.value!!.getContext("2d")!!;
      ctx.translate(0.5, 0.5);

      watch(
        () => [store.domainContext],
        () => {
          repaint(ctx, store.domainContext);
        }
      );
    });

    const repaint = (ctx: CanvasRenderingContext2D, context: DomainContext) => {
      ctx.clearRect(0, 0, canvas.value!!.width, canvas.value!!.height);

      ctx.strokeStyle = "#cccccc";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(canvas.value!!.width, 0);
      ctx.closePath();
      ctx.stroke();

      ctx.strokeStyle = "#cccccc";
      ctx.font = "11px helvetica";
      ctx.beginPath();

      const quotePositions = store.domainContext.quotePositions;
      for (let i=0; i < quotePositions.length; i++) {
        const quotePosition = quotePositions[i];
        if (quotePosition.major) {
          ctx.moveTo(quotePosition.pos, 0);
          ctx.lineTo(quotePosition.pos, 5);

          if (quotePosition.quote) {
            const text = quotePosition.quote.tradeDate
            const metrics = ctx.measureText(text);
            ctx.fillText(text, quotePosition.pos - metrics.width / 2, 17);
          }
        }
      }

      ctx.stroke();
    };

    return { onMounted, pane, canvas, width, DATE_PANE_HEIGHT };
  },
});
</script>

<style lang="scss" scoped>
.chart-date-pane {
  height: 21px;
  direction: ltr;

  canvas {
    display: block;
  }
}
</style>
