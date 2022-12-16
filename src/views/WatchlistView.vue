<template>
  <div class="watchlist-view">
    <table>
      <thead>
        <tr>
          <th class="actions-column"></th>
          <th>Number</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in watchlistItems" :key="item.id" @click="select(item)" :class="{'selected': item === selectedItem}">
          <td class="actions-column">
            <div class="action-list">
              <button class="action-button" @click="showChart(item)">
                <img src="../assets/images/stock-chart.svg" alt="add" />
              </button>
            </div>
          </td>
          <td>{{ item.number }}</td>
          <td>{{ item.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script lang="ts">
import { selectSecurity } from "@/services/security-selector.service";
import { WatchlistItem, useWatchlistStore } from "@/store/watchlist.store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "watchlistView",

  setup() {
    const selectedItem = ref<WatchlistItem | undefined>();

    const watchlistStore = useWatchlistStore();
    const watchlistItems = watchlistStore.items

    const select = async (item: WatchlistItem) => {
      selectedItem.value = item;
      await selectSecurity(item);
    };

    const showChart = async (security: WatchlistItem) => {
      await selectSecurity(security);
    };

    return { watchlistItems, selectedItem, select, showChart };
  },
});
</script>

<style lang="scss" scoped>
.watchlist-view {
  @import "../styles/table.scss";
  overflow: auto;

  table {
    width: 300px;
  }
}
</style>
