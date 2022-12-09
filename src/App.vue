<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { onMounted } from 'vue';
import { generateChartPanes } from './chart/chart-generator.service';
import HoldingsTable from './components/HoldingsTable.vue';
import SecurityChart from './components/SecurityChart.vue';
import { getSecurityHistory } from './services/security-list.service';

const click = async () => {
  const response1 = await getSecurityHistory("662577", 1)
  console.log(JSON.stringify(response1));
  const response2 = await getSecurityHistory("662577", 2)
  console.log(JSON.stringify(response2));
  const response3 = await getSecurityHistory("662577", 3)
  console.log(JSON.stringify(response3));
  const response4 = await getSecurityHistory("662577", 4)
  console.log(JSON.stringify(response4));
  const response5 = await getSecurityHistory("662577", 5)
  console.log(JSON.stringify(response5));

}

onMounted(() => {
  generateChartPanes();
})
</script>

<template>
  <HoldingsTable msg="Hello Vue 3 + TypeScript + Vite"></HoldingsTable>
  <SecurityChart></SecurityChart>
  <button @click="click()">aaabbbb</button>
</template>

<style>
html {
  direction: rtl;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.logo-box {
  display: flex;
  width: 100%;
  justify-content: center;
}

.static-public {
  display: flex;
  align-items: center;
  justify-content: center;
}

.static-public code {
  background-color: #eee;
  padding: 2px 4px;
  margin: 0 4px;
  border-radius: 4px;
  color: #304455;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: 0.75s;
}

.logo.vite:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.electron:hover {
  filter: drop-shadow(0 0 2em #9FEAF9);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
