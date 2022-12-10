<template>
  <div class="security-list-view">
    <button @click="refreshList">Refresh List</button>
    <table>
      <thead>
        <tr>
          <th>מספר נייר</th>
          <th>שם</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="security in securityList" :key="security.securityNumber" @click="select(security)" :class="{'selected': security === selectedSecurity}">
          <td>{{ security.securityNumber }}</td>
          <td>{{ security.securityName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { getSecurityList, Security } from "../services/security-list.service";
import fs from "fs";
import { useSecurityListStore } from "@/store/security-list.store";

export default defineComponent({
  name: "SecurityListView",

  setup() {
    const securityList = ref<Security[]>()
    const selectedSecurity = ref<Security | undefined>();

    const securityListStore = useSecurityListStore();
    securityList.value = securityListStore.securityList

    const refreshList = async () => {
      securityList.value = await getSecurityList();
      // fs.writeFileSync("C:/programming/investments/src/data/security-list.data.json", JSON.stringify(securityList.value, null, 4));
    };

    const select = (security: Security) => {
      selectedSecurity.value = security;
    };

    return { securityList, refreshList, select, selectedSecurity };
  }
});
</script>

<style lang="scss" scoped>
.security-list-view {
  @import "../styles/table.scss";
}
</style>
