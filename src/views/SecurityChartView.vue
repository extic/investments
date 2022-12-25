<template>
  <div class="security-chart-view">
    <div v-if="!selectedSecurity" class="loading">
      <img src="../assets/images/loading.gif"/>
      <div class="loading-title">Loading Chart...</div>
    </div>
    <SecurityChart v-else></SecurityChart>
  </div>

</template>

<script lang="ts">
import { generateCharts } from "@/chart/chart-generator.service";
import { SecurityDataFile, readSecurityDataFile, saveSecurityDataFile } from "@/services/db/security-data.db.service";
import { supplementSecurityDataFile } from "@/services/security-data-supplementor.service";
import { useChartStore } from "@/store/chart.store";
import { useSecurityListStore } from "@/store/security-list.store";
import { computed, defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import SecurityChart from "../components/SecurityChart.vue";
import { nextTick } from "process";

export default defineComponent({
  name: "SecurityChartView",

  components: { SecurityChart },

  setup() {
    const chartStore = useChartStore();
    const selectedSecurity = computed(() => {
      return chartStore.selectedSecurity;
    });

    function readDataFile(securityNumber: string): SecurityDataFile {
      try {
          return readSecurityDataFile(securityNumber);
      } catch (err) {
        return {
          created: "",
          securityNumber,
          data: [],
        }
      }
    }

    onMounted(async () => {
      const chartStore = useChartStore();
      chartStore.setSelectedSecurity(undefined);

      const securityNumber = useRoute().params.securityNumber as string;
      const fileData = readDataFile(useRoute().params.securityNumber as string);

      const { modified, data: newData } = await supplementSecurityDataFile(fileData, securityNumber);
      newData.sort((a, b): number => a.tradeDate - b.tradeDate);
      if (modified) {
          saveSecurityDataFile(securityNumber, newData);
      }

      const securityListStore = useSecurityListStore()
      const security = securityListStore.list.find((it) => it.number === securityNumber);
      chartStore.setSelectedSecurity(security);
      chartStore.setSecurityData(newData);

      nextTick(() => {
        generateCharts(newData);
      })
    });

    return { selectedSecurity }
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
