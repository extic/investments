<template>
  <div class="watchlist-view">
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in watchlistItems" :key="item.id" @click="select(item)" :class="{'selected': item === selectedItem}">
          <td>{{ item.securityNumber }}</td>
          <td>{{ item.securityName }}</td>
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
      await selectSecurity(item.securityNumber);
    };

    return { watchlistItems, selectedItem, select };
  },
});
</script>

<style lang="scss" scoped>
.watchlist-view {
  @import "../styles/table.scss";
}
</style>
