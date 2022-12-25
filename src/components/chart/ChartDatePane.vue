<template>
  <div class="chart-date-pane" ref="pane">
    <canvas ref="canvas" :width="width" :height="DATE_PANE_HEIGHT"></canvas>
  </div>
</template>

<script lang="ts">
import { RenderContext, useChartStore } from "../../store/chart.store";
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

      // const ctx = canvas.value!!.getContext("2d")!!;
      // width.value = 500;//pane.value!!.offsetWidth;
      // nextTick(() => {
      //   ctx.translate(0.5, 0.5);
      //   repaint(ctx);
      // });

      watch(
        () => [store.renderContext],
        () => {
          repaint(ctx, store.renderContext);
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

    const repaint = (ctx: CanvasRenderingContext2D, context: RenderContext) => {
      ctx.clearRect(0, 0, canvas.value!!.width, canvas.value!!.height);

      ctx.strokeStyle = "#cccccc";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(canvas.value!!.width, 0);
      ctx.closePath();
      ctx.stroke();

      const data = store.securityData;
      const textInterval = calcTextInterval(context.quoteWidth);

      ctx.strokeStyle = "#cccccc";
      ctx.font = "11px helvetica";
      ctx.beginPath();

      const quotePositions = store.renderContext.quotePositions;
      let i = quotePositions.length - 1;
      while (quotePositions[i].index === undefined && i >= 0) {
        i--;
      }
      while (i >= 0) {
        const quotePosition = quotePositions[i];
        ctx.moveTo(quotePosition.pos, 0);
        ctx.lineTo(quotePosition.pos, 5);

        const securityData = data[quotePosition.index!!];
        if (securityData) {
          const text = securityData.tradeDateStr
          const metrics = ctx.measureText(text);
          ctx.fillText(text, quotePosition.pos - metrics.width / 2, 17);
        }

        i -= textInterval;
      }


      // let pos = canvas.value!!.width - quoteWidth / 2;
      // for (let i = store.toDate; i >= store.fromDate; i -= 24 * 60 * 60 * 1000) {
      //   const roundedPos = Math.round(pos)
      //   ctx.moveTo(roundedPos, 0);
      //   ctx.lineTo(roundedPos, 5);

      //   if (i % textInterval === 0) {
      //     const text = data[i].tradeDateStr
      //     const metrics = ctx.measureText(text);
      //     ctx.fillText(text, pos - metrics.width / 2, 17);
      //   }

      //   pos -= quoteWidth;
      // }
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
  // position: absolute;
  // left: 0;
  // right: 0;
  // bottom: 0;
  direction: ltr;

  canvas {
    display: block;
  }
}
</style>
