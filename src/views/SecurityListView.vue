<template>
  <div class="security-list-view">
    <button @click="refreshList">Refresh List</button>
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
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
import { computed, defineComponent, ref } from "vue";
import { getSecurityList } from "../services/tase.service";
import { Security, useSecurityListStore } from "@/store/security-list.store";
import { selectSecurity } from "@/services/security-selector.service";

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

    return { securityList, refreshList, select, selectedSecurity };
  }
});
</script>

<style lang="scss" scoped>
.security-list-view {
  @import "../styles/table.scss";
}
</style>
