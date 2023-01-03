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
        <tr v-for="id in store.items" @click="select(id)" :class="{'selected': id === store.selected}">
          <td class="actions-column">
            <div class="action-list">
              <button class="action-button" @click="showChart(id)">
                <img src="../assets/images/stock-chart.svg" alt="add" />
              </button>
            </div>
          </td>
          <td>{{ id }}</td>
          <td>{{ getSecurityName(id) }}</td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script lang="ts">
import router from "@/router";
import { useSecurityListStore } from "@/store/security-list.store";
import { useWatchlistStore } from "@/store/watchlist.store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "watchlistView",

  setup() {
    const store = useWatchlistStore();
    const securityStore = useSecurityListStore();

    const getSecurityName = (id: string) => {
      return securityStore.list.find((it) => it.id === id)!!.name;
    };

    const select = async (id: string) => {
      if (store.selected === id) {
        store.setSelected(undefined);
      } else {
        store.setSelected(id);
      }
    };

    const showChart = async (id: string) => {
      await router.push({ name: 'securityChart', params: { securityId: id }});
    };

    return { store, getSecurityName, select, showChart };
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
