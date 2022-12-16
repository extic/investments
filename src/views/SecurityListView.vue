<template>
  <div class="security-list-view">
    <button @click="refreshList">Refresh List</button>
    <table>
      <thead>
        <tr>
          <th class="actions-row"></th>
          <th>Number</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="security in securityList" :key="security.number" @click="select(security)" :class="{ selected: security === selectedSecurity }">
          <td class="actions-row">
            <div class="action-list">
              <button class="action-button" @click="addSecurity(security, $event)">
                <img src="../assets/images/three-dots.svg" alt="add" />
              </button>
              <button class="action-button" @click="showChart(security)">
                <img src="../assets/images/stock-chart.svg" alt="add" />
              </button>
            </div>
          </td>
          <td>{{ security.number }}</td>
          <td>{{ security.name }}</td>
        </tr>
      </tbody>
    </table>
    <div
      ref="addContextMenu"
      class="context-menu"
      :class="{ show: showContextMenu }"
      :style="{ top: `${contextMenuTop}px`, left: `${contextMenuLeft}px` }"
    >
      <ul>
        <li @click="addToPortfolio">Add to Protfolio</li>
        <li @click="track">Add to Watchlist</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { SecurityListItem, useSecurityListStore } from "@/store/security-list.store";
import { selectSecurity } from "@/services/security-selector.service";
import { useWatchlistStore, WatchlistItem } from "@/store/watchlist.store";
import { randomUUID } from "crypto";
import { Security, SelectedSecurity } from "@/types/types";
import { getSecurityList } from "@/services/tase.service";
import { writeFile } from "@/services/file.service";
import { useChartStore } from "@/store/chart.store";

export default defineComponent({
  name: "SecurityListView",

  setup() {
    const securityListStore = useSecurityListStore();
    const chartStore = useChartStore();

    const securityList = computed(() => {
      return securityListStore.list;
    });

    const selectedSecurity = computed(() => {
      return securityListStore.selected;
    });

    const refreshList = async () => {
      const list = await getSecurityList();
      await writeFile("security-list", list);
      securityListStore.setList(list);
    };

    const select = async (security: SecurityListItem) => {
      if (selectedSecurity.value === security) {
        securityListStore.setSelected(undefined);
      } else {
        securityListStore.setSelected(security);
      }
    };

    const showContextMenu = ref(false);
    const contextMenuTop = ref(0);
    const contextMenuLeft = ref(0);

    const addSecurity = (security: Security, event: MouseEvent) => {
      showContextMenu.value = true;
      contextMenuLeft.value = event.x;
      contextMenuTop.value = event.y;
    };

    const showChart = async (security: Security) => {
      await selectSecurity(security);
    };

    const addToPortfolio = () => {
      // const portfolioStore = usePortfolioStore();
      // portfolioStore.add(selectedSecurity.value);
      showContextMenu.value = false;
    };

    const track = () => {
      const watchlistStore = useWatchlistStore();
      watchlistStore.add({
        id: randomUUID(),
        number: selectedSecurity.value!!.number,
        name: selectedSecurity.value!!.name,
      } as WatchlistItem);
      showContextMenu.value = false;
    };

    return {
      securityList,
      refreshList,
      select,
      selectedSecurity,
      addSecurity,
      addToPortfolio,
      track,
      showContextMenu,
      contextMenuLeft,
      contextMenuTop,
      showChart,
    };
  },
});
</script>

<style lang="scss" scoped>
.security-list-view {
  @import "../styles/table.scss";
  overflow: auto;

  .actions-row {
    width: 4em;
    padding: 0.2em 0;
    // padding: 0.2em 1em;
  }

  .action-list {
    display: flex;
    gap: 0.5em;
    opacity: 0;
    justify-content: center;

    .action-button {
      background-color: transparent;
      border: none;
      padding: 0.2em;
      margin: 0;
      display: block;
      cursor: pointer;

      &:hover {
        background-color: #b9b9b9;
        border-radius: 5px;
      }

      img {
        width: 1em;
        height: 1em;
      }
    }
  }

  tr:hover .action-list,
  tr.selected .action-list {
    opacity: 1;
  }

  table {
    table-layout: fixed;
    width: 300px;
  }

  .context-menu {
    position: fixed;
    top: 40px;
    left: 100px;
    display: none;

    &.show {
      display: block;
    }

    ul {
      list-style: none;
      margin: 0;
      padding: 0.3em 0;
      border: 1px solid gray;
      border-radius: 5px;
      background-color: white;

      li {
        padding: 0.3em 1em 0.3em 1em;
        cursor: default;
      }

      li:hover {
        background-color: rgb(199, 199, 199);
      }
    }
  }
}
</style>
