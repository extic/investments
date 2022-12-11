<template>
  <div class="app">
    <HeaderBar class="header"></HeaderBar>
    <div class="content">
      <router-view class="view" />
      <div class="chart-container">
        <SecurityChart></SecurityChart>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import HeaderBar from "./components/HeaderBar.vue";
import SecurityChart from "./components/SecurityChart.vue";
import { initApp } from "./services/initializer.service";

onMounted(() => {
  initApp();
});
</script>

<style lang="scss">
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  font-size: 14px;

  .content {
    flex-grow: 1;
    display: flex;

    .chart-container {
      width: 75%;
    }

    .view {
      width: 25%;
      overflow: auto;
    }
  }
}
</style>
