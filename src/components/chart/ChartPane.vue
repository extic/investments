<template>
  <div class="chart-pane" ref="pane" :style="{ height: `${paneHeight}px` }">
    <canvas ref="canvas" :width="paneWidth" :height="paneHeight"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import { ChartRenderer } from "@/chart/chart.renderer";
import { useChartStore } from "@/store/chart-store";

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

        // console.log("barak");
        // console.log(newStartIndex, newEndIndex)
        //const minMax = props.renderer?.findMinMax(newStartIndex, newEndIndex);
        const ctx = canvas.value!!.getContext("2d")!!;
        props.renderer!!.paint(ctx, canvas.value!!.offsetWidth, canvas.value!!.offsetHeight, newStartIndex, newEndIndex, store.quoteWidth);
      }
    );

    onMounted(() => {
      paneWidth.value = pane.value!!.offsetWidth;
      store.setChartWidth(paneWidth.value);
      paneHeight.value = props.renderer!!.getHeight();
    });

    return { paneWidth, paneHeight, pane, canvas };
  },
});
</script>

<style lang="scss" scoped>
.chart-pane {
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
