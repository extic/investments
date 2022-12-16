<template>
  <div class="watchlist-view">
    <SecurityChart></SecurityChart>
  </div>

</template>

<script lang="ts">
import { selectSecurity } from "@/services/security-selector.service";
import { WatchlistItem, useWatchlistStore } from "@/store/watchlist.store";
import { defineComponent, ref } from "vue";
import SecurityChart from "../components/SecurityChart.vue"

export default defineComponent({
  name: "SecurityChartView",

  components: { SecurityChart },

  setup() {
    // const selectedItem = ref<WatchlistItem | undefined>();

    // const watchlistStore = useWatchlistStore();
    // const watchlistItems = watchlistStore.items

    // const select = async (item: WatchlistItem) => {
    //   selectedItem.value = item;
    //   await selectSecurity(item.securityNumber);
    // };

    // return { watchlistItems, selectedItem, select };
    return {}
  },
});
</script>

<style lang="scss" scoped>
.watchlist-view {
  @import "../styles/table.scss";
}
</style>
