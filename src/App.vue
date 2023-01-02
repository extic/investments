<template>
  <HeaderBar class="header"></HeaderBar>
  <router-view class="view" />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import HeaderBar from "./components/HeaderBar.vue";
import { initApp } from "./services/initializer.service";

onMounted(() => {
  initApp();
});
</script>

<style lang="scss">
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  box-sizing: border-box;
  // overflow: hidden;

  .header {
    height: 3em;
  }

  .view {
    height: calc(100% - 3em);
  }
}
</style>
