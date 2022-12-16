<template>
  <div class="portfolio-view">
    <table>
      <thead>
        <tr>
          <th class="actions-column"></th>
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
        <tr v-for="item in portfolioItems" :key="item.id" @click="select(item)" :class="{'selected': item === selectedItem}">
          <td class="actions-column">
            <div class="action-list">
              <button class="action-button" @click="showChart(item)">
                <img src="../assets/images/stock-chart.svg" alt="add" />
              </button>
            </div>
          </td>
          <td>{{ item.number }}</td>
          <td>{{ item.name }}</td>
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
import { selectSecurity } from "@/services/security-selector.service";
import { PortfolioItem, usePortfolioStore } from "@/store/portfolio.store";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "PortfolioView",

  setup() {
    const selectedItem = ref<PortfolioItem | undefined>();

    const portfolioStore = usePortfolioStore();
    const portfolioItems = portfolioStore.items

    const select = async (item: PortfolioItem) => {
      selectedItem.value = item;
      await selectSecurity(item);
    };

    const showChart = async (security: PortfolioItem) => {
      await selectSecurity(security);
    };

    return { portfolioItems, selectedItem, select, showChart };
  },
});
</script>

<style lang="scss" scoped>
.portfolio-view {
  @import "../styles/table.scss";
  overflow: auto;

  table {
    width: 1200px;
  }
}
</style>
