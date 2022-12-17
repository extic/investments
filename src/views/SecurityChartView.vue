<template>
  <div class="watchlist-view">
    <div v-if="!selectedSecurity" class="loading">
      <img src="../assets/images/loading.gif"/>
      <div class="loading-title">Loading Chart...</div>
    </div>
    <SecurityChart v-else></SecurityChart>
  </div>

</template>

<script lang="ts">
import { selectSecurity } from "@/services/security-selector.service";
import { useChartStore } from "@/store/chart.store";
import { WatchlistItem, useWatchlistStore } from "@/store/watchlist.store";
import { SelectedSecurity } from "@/types/types";
import { computed, defineComponent, ref } from "vue";
import SecurityChart from "../components/SecurityChart.vue"

export default defineComponent({
  name: "SecurityChartView",

  components: { SecurityChart },

  setup() {
    const chartStore = useChartStore();
    const selectedSecurity = computed(() => {
      return chartStore.selectedSecurity;
    });

    // const watchlistStore = useWatchlistStore();
    // const watchlistItems = watchlistStore.items

    // const select = async (item: WatchlistItem) => {
    //   selectedItem.value = item;
    //   await selectSecurity(item.securityNumber);
    // };

    // return { watchlistItems, selectedItem, select };
    return { selectedSecurity }
  },
});
</script>

<style lang="scss" scoped>
.watchlist-view {
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
