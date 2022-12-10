<template>
  <div class="holdings-view">
    <table>
      <thead>
        <tr>
          <th>מספר נייר</th>
          <th>שם</th>
          <th>תאריך קנייה</th>
          <th>מחיר קנייה</th>
          <th>כמות</th>
          <th>סכום קנייה</th>
          <th>עמלת קנייה</th>
          <th>שער נוכחי</th>
          <th>שינוי מקנייה</th>
          <th>שינוי היום</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="holding in holdings" :key="holding.id">
          <td>{{ holding.securityNumber }}</td>
          <td>{{ holding.securityName }}</td>
          <td>{{ holding.buyDate }}</td>
          <td>{{ holding.buyPrice }}</td>
          <td>{{ holding.quantity }}</td>
          <td>{{ holding.buyAmount }}</td>
          <td>{{ holding.buyCommission }}</td>
          <td>
            <span class="number">{{ holding.currentQuote }}</span>
          </td>
          <td>
            <div class="change-cell">
              <div class="arrow-up">▲</div>
              <div class="number">{{ holding.changeFromBuy }}</div>
              <div class="number">{{ holding.changeFromBuyPercentage }}%</div>
            </div>
          </td>
          <td>
            <div class="change-cell">
              <div class="arrow-down">▼</div>
              <div class="number">{{ holding.changeToday }}</div>
              <div class="number">{{ holding.changeTodayPercentage }}%</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import holdings from "../data/holdings.data.json";

export default defineComponent({
  name: "HoldingsView",

  setup() {
    return { holdings };
  },
});
</script>

<style lang="scss" scoped>
.holdings-view {
  @import "../styles/table.scss";
}
</style>
