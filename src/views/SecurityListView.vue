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
        <tr v-for="security in securityList" :key="security.securityNumber" @click="select(security)" :class="{'selected': security === selectedSecurity}">
          <td class="actions-row">
            <button class="add-button" @click="addSecurity(security, $event)">
              <img src="../assets/images/three-dots.svg" alt="add">
            </button>
          </td>
          <td>{{ security.securityNumber }}</td>
          <td>{{ security.securityName }}</td>
        </tr>
      </tbody>
    </table>
    <div ref="addContextMenu" class="context-menu" :class="{'show': showContextMenu}" :style="{top: `${contextMenuTop}px`, left: `${contextMenuLeft}px`}">
      <ul>
        <li @click="addToPortfolio">Add to Protfolio</li>
        <li @click="track">Add to Watchlist</li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { Security, useSecurityListStore } from "@/store/security-list.store";
import { selectSecurity } from "@/services/security-selector.service";
import { useWatchlistStore, WatchlistItem } from "@/store/watchlist.store";
import { randomUUID } from "crypto";

export default defineComponent({
  name: "SecurityListView",

  setup() {
    const securityListStore = useSecurityListStore();

    const securityList = computed(() => {
      return securityListStore.securityList;
    });
    const selectedSecurity = ref<Security | undefined>();

    // securityList.value = securityListStore.securityList

    const refreshList = async () => {
      // securityList.value = await getSecurityList();
      // fs.writeFileSync("C:/programming/investments/src/data/security-list.data.json", JSON.stringify(securityList.value, null, 4));
    };

    const select = async (security: Security) => {
      selectedSecurity.value = security;
      await selectSecurity(security.securityNumber);
    };

    const showContextMenu = ref(false);
    const contextMenuTop = ref(0);
    const contextMenuLeft = ref(0);

    const addSecurity = (security: Security, event: MouseEvent) => {
      showContextMenu.value = true;
      contextMenuLeft.value = event.x;
      contextMenuTop.value = event.y;
    }

    const addToPortfolio = () => {
      // const portfolioStore = usePortfolioStore();
      // portfolioStore.add(selectedSecurity.value);
      showContextMenu.value = false;
    }

    const track = () => {
      const watchlistStore = useWatchlistStore();
      watchlistStore.add({
        id: randomUUID(),
        securityNumber: selectedSecurity.value!!.securityNumber,
        securityName: selectedSecurity.value!!.securityName,
      } as WatchlistItem);
      showContextMenu.value = false;
    }

    return { securityList, refreshList, select, selectedSecurity, addSecurity, addToPortfolio, track, showContextMenu, contextMenuLeft, contextMenuTop };
  }
});
</script>

<style lang="scss" scoped>
.security-list-view {
  @import "../styles/table.scss";

  .add-button {
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
    opacity: 0;
    display: block;
    width: 100%;


    img {
      width: 1em;
      height: 1em;
    }
  }

  tr:hover .add-button, tr.selected .add-button {
    opacity: 1;
  }

  table {
    table-layout: fixed;
    width: 300px;
  }

  .actions-row {
    width: 3em;
    padding: 0.4em 0;
    // padding: 0.2em 1em;
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
