<template>
  <div class="security-chart-view">
    <div v-if="!selectedSecurity" class="loading">
      <img src="../assets/images/loading.gif" />
      <div class="loading-title">Loading Chart...</div>
    </div>
    <SecurityChart v-else></SecurityChart>
  </div>
</template>

<script lang="ts">
import { assureSecurityFolderExists, readMetaDataFile, readQuotesDataFile, saveQuotesDataFile, readDrawingDataFile } from "@/services/db/security-data.db.service";
import { supplementSecurityDataFile } from "@/services/security-data-supplementor.service";
import { useChartStore } from "@/store/chart.store";
import { computed, defineComponent, nextTick, onMounted } from "vue";
import { useRoute } from "vue-router";
import SecurityChart from "../components/SecurityChart.vue";
import { useSecurityListStore } from "@/store/security-list.store";
import { LineDrawing } from "@/chart/drawings/line.drawing";
import { generateCharts } from "@/chart/chart-generator.service";

export default defineComponent({
  name: "SecurityChartView",

  components: { SecurityChart },

  setup() {
    const chartStore = useChartStore();
    const selectedSecurity = computed(() => {
      return chartStore.selectedSecurity;
    });

    onMounted(async () => {
      const chartStore = useChartStore();
      chartStore.setSelectedSecurity(undefined);

      const securityNumber = useRoute().params.securityNumber as string;
      assureSecurityFolderExists(securityNumber);

      const quotesDataFile = readQuotesDataFile(useRoute().params.securityNumber as string);

      const { modified, quotes: newData } = await supplementSecurityDataFile(quotesDataFile, securityNumber);
      newData.sort((a, b): number => a.tradeDateMillis - b.tradeDateMillis);
      if (modified) {
        saveQuotesDataFile(securityNumber, newData);
      }

      const securityListStore = useSecurityListStore();
      const security = securityListStore.list.find((it) => it.number === securityNumber);
      chartStore.setSelectedSecurity(security);

      const drawingDataFile = readDrawingDataFile(securityNumber);
      const drawings = drawingDataFile.drawings.map((it) => {
        if (it.type === 'line') {
          return new LineDrawing(it.chartName, it.data);
        }
        throw Error(`Unknown type of drawing: ${it.type}`);
      })

      chartStore.setChartData(newData, drawings);

      nextTick(() => {
        generateCharts(newData);
      });
    });

    return { selectedSecurity };
  },
});
</script>

<style lang="scss" scoped>
.security-chart-view {
  @import "../styles/table.scss";

  .loading {
    margin-top: 150px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .loading-title {
      margin-top: 1em;
      font-size: 2em;
    }
  }
}
</style>
