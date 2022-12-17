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
        <tr v-for="item in store.items" :key="item.id" @click="select(item)" :class="{'selected': item === store.selected}">
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
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "watchlistView",

  setup() {
    const store = useWatchlistStore();

    const select = async (item: WatchlistItem) => {
      if (store.selected === item) {
        store.setSelected(undefined);
      } else {
        store.setSelected(item);
      }
    };

    const showChart = async (security: WatchlistItem) => {
      await selectSecurity(security);
    };

    return { store, select, showChart };
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
