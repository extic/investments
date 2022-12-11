<template>
  <div class="portfolio-view">
    <table>
      <thead>
        <tr>
          <th>Number</th>
          <th>Name</th>
          <th>Buy Date</th>
          <th>Buy Price</th>
          <th>Quantity</th>
          <th>Buy Amount</th>
          <th>Buy Commission</th>
          <th>Current Quote</th>
          <th>Change from Buy</th>
          <th>Change Today</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in portfolioItems" :key="item.id">
          <td>{{ item.securityNumber }}</td>
          <td>{{ item.securityName }}</td>
          <td>{{ item.buyDate }}</td>
          <td>{{ item.buyPrice }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.buyAmount }}</td>
          <td>{{ item.buyCommission }}</td>
          <td>
            <span class="number">{{ item.currentQuote }}</span>
          </td>
          <td>
            <div class="change-cell">
              <div class="arrow-up">▲</div>
              <div class="number">{{ item.changeFromBuy }}</div>
              <div class="number">{{ item.changeFromBuyPercentage }}%</div>
            </div>
          </td>
          <td>
            <div class="change-cell">
              <div class="arrow-down">▼</div>
              <div class="number">{{ item.changeToday }}</div>
              <div class="number">{{ item.changeTodayPercentage }}%</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { usePortfolioStore } from "@/store/portfolio.store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PortfolioView",

  setup() {
    const portfolioStore = usePortfolioStore();
    const portfolioItems = portfolioStore.items
    return { portfolioItems };
  },
});
</script>

<style lang="scss" scoped>
.portfolio-view {
  @import "../styles/table.scss";
}
</style>
