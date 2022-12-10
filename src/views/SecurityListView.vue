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
        <tr v-for="security in securityList" :key="security.securityNumber">
          <td>{{ security.securityNumber }}</td>
          <td>{{ security.securityName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import list from "../data/security-list.data.json";
import { getSecurityList, Security } from "../services/security-list.service";
import fs from "fs";

export default defineComponent({
  name: "SecurityListView",

  setup() {
    const securityList = ref<Security[]>()
    securityList.value = list as unknown as Security[];

    const refreshList = async () => {
      securityList.value = await getSecurityList();
      fs.writeFileSync("C:/programming/investments/src/data/security-list.data.json", JSON.stringify(securityList.value, null, 4));
    }

    return { securityList, refreshList };
  }
});
</script>

<style lang="scss" scoped>
.security-list-view {
  @import "../styles/table.scss";
}
</style>
