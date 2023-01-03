<template>
  <div class="security-list-view">
    <div class="action-bar">
      <div class="right-side">
        <div class="field">
          <span>Index</span>
          <select v-model="selectedIndex">
            <option v-for="index in indices">{{ index }}</option>
          </select>
        </div>
        <div class="field">
          <span>Filter</span>
          <input v-model="filter" />
        </div>
      </div>
      <button class="refresh-button" @click="refreshList">
        <img src="../assets/images/refresh.svg" alt="refresh" :class="{ refreshing: isRefreshing }" />
      </button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="actions-column"></th>
            <th>Number</th>
            <th class="name-column">Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="security in securityList" :key="security.id" @click="select(security)" :class="{ selected: security === selectedSecurity }">
            <td class="actions-column">
              <div class="action-list">
                <button class="action-button" @click="addSecurity(security, $event)">
                  <img src="../assets/images/three-dots.svg" alt="add" />
                </button>
                <button class="action-button" @click="showChart(security)">
                  <img src="../assets/images/stock-chart.svg" alt="add" />
                </button>
              </div>
            </td>
            <td>{{ security.id }}</td>
            <td class="name-column">{{ security.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
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
import router from "@/router";
import { writeFile } from "@/services/file.service";
import { getSecurityList } from "@/services/tase/security-list.tase.service";
import { useSecurityListStore } from "@/store/security-list.store";
import { Security } from "@/types/types";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "SecurityListView",

  setup() {
    const store = useSecurityListStore();

    const filter = computed({
      get: () => {
        return store.filter;
      },
      set: (newValue: string) => {
        store.setFilter(newValue);
      },
    });

    const indices = computed(() => {
      return store.indices;
    });

    const selectedIndex = computed({
      get: () => {
        return store.selectedIndex;
      },
      set: (newValue: string) => {
        store.setSelectedIndex(newValue);
      },
    });

    const refreshList = async () => {
      store.setRefreshing(true);
      const list = await getSecurityList();
      writeFile("security-list", list);
      store.setList(list);
      store.setRefreshing(false);
    };

    const isRefreshing = computed(() => {
      return store.refreshing;
    });

    const securityList = computed(() => {
      const indexFilter = selectedIndex.value === "" ? store.list : store.list.filter((it) => it.indices.includes(selectedIndex.value));
      const filterText = filter.value;
      return filterText.trim() === "" ? indexFilter : indexFilter.filter((it) => it.name.includes(filterText));
    });

    const selectedSecurity = computed(() => {
      return store.selected;
    });

    const select = async (security: Security) => {
      if (selectedSecurity.value === security) {
        store.setSelected(undefined);
      } else {
        store.setSelected(security);
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
      await router.push({ name: "securityChart", params: { securityId: security.id } });
    };

    const addToPortfolio = () => {
      // const portfolioStore = usePortfolioStore();
      // portfolioStore.add(selectedSecurity.value);
      showContextMenu.value = false;
    };

    const track = () => {
      // const watchlistStore = useWatchlistStore();
      // watchlistStore.add({
      //   id: randomUUID(),
      //   number: selectedSecurity.value!!.number,
      //   name: selectedSecurity.value!!.name,
      // } as WatchlistItem);
      // showContextMenu.value = false;
    };

    return {
      filter,
      indices,
      selectedIndex,
      refreshList,
      isRefreshing,
      securityList,
      selectedSecurity,
      select,
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
  display: flex;
  flex-direction: column;

  .action-bar {
    display: flex;
    padding: 0.2em 1em;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid lightgray;

    .right-side {
      display: flex;
      gap: 2em;
      align-items: center;
    }

    .field {
      display: flex;
      gap: 0.5em;
      align-items: center;

      select {
        direction: rtl;
      }
    }

    .refresh-button {
      line-height: 0em;
      padding: 0 1em;
      img {
        width: 1.5em;
        height: 1.5em;

        &.refreshing {
          animation: rotation 2s infinite linear;
        }
      }
    }
  }

  .table-container {
    overflow: auto;
    flex-grow: 1;
    margin-top: 0.5em;

    table {
      // width: 300px;

      .name-column {
        width: 10em;
      }
    }
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

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
}
</style>
