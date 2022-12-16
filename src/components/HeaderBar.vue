<template>
  <div class="header-bar">
    <div v-if="selectedSecurity">
      <nav class="regular">
        <button class="back-button" @click="backPressed">Back</button>
        <h1>{{ selectedSecurity.name }}</h1>
      </nav>
    </div>
    <div v-else>
      <nav class="tabs">
        <router-link to="/security-list">
          <div class="tab">Stock List</div>
        </router-link>
        <router-link to="/watchlist">
          <div class="tab">Watchlist</div>
        </router-link>
        <router-link to="/portfolio">
          <div class="tab">Portfolio</div>
        </router-link>
      </nav>
      <div class="under-bar"></div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { useChartStore } from "@/store/chart.store";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "HeaderBar",

  setup() {
    const chartStore = useChartStore();
    const selectedSecurity = computed(() => {
      return chartStore.selectedSecurity;
    });

    const backPressed = () => {
      chartStore.setSelectedSecurity(undefined);
      router.back();
    };

    return { selectedSecurity, backPressed };
  }
});
</script>

<style lang="scss" scoped>
.header-bar {
  height: 3em;

  .tabs {
    display: flex;
    height: 2em;
    align-items: end;
    padding: 0 1em;

    a:link, a:visited, a:hover, a:active {
      color: white;
      text-decoration: none;;
    }

    .tab {
      color: black;
      padding: 0.2em 1em 0.2em 1em;
      border-radius: 5px 5px 0 0;
    }

    .router-link-exact-active > .tab {
      background-color: #197C63;
      color: white;
    }
  }

  .under-bar {
    height: 1em;
    background-color: #197C63;
  }

  .regular {
    display: flex;
    background-color: #197C63;
    gap: 1em;
    height: 3em;
    align-items: center;
    padding: 0 1em;

    .back-button {
      border: none;
      background-color: transparent;
      color: white;
      box-sizing: border-box;
      border: 1px solid transparent;
      transition: border 0.2s, background-color 0.2s, color 0.2s;
      border-radius: 5px;

      &::before {
        content: '<  ';
      }

      &:hover {
        border: 1px solid #d1d1d1;
        background-color: white;
        color: black;
        cursor: pointer;
      }
    }

    h1 {
      margin: 0;
      padding: 0;
      color: white;
      // font-size: 1em;
    }
  }
}
</style>
