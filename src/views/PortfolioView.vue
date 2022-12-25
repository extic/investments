<template>
  <div class="portfolio-view">
    <div class="action-bar">
      <button class="refresh-button" @click="refresh">Refresh</button>
      <div>
        <span>Last Refreshed: </span>
        <span>{{ store.lastRefresh ?? "Never" }}</span>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th class="actions-column"></th>
          <th>Number</th>
          <th>Name</th>
          <th>Buy Date</th>
          <th>Buy Rate</th>
          <th>Quantity</th>
          <th>Buy Price</th>
          <th>Commission</th>
          <th>Current Quote</th>
          <th>Change from Buy</th>
          <th>Change Today</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in store.items" :key="item.id" @click="select(item)" :class="{ selected: item === store.selected }">
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
          <td>{{ item.buyRate }}</td>
          <td>{{ item.quantity }}</td>
          <td>{{ item.buyPrice }}</td>
          <td>{{ item.buyCommission }}</td>
          <td>
            <span class="number">{{ item.lastRate }}</span>
          </td>
          <td>
            <div class="change-cell" :class="{ up: item.changeFromBuy > 0, down: item.changeFromBuy < 0 }">
              <div class="arrow" v-if="item.changeFromBuy > 0">▲</div>
              <div class="arrow" v-if="item.changeFromBuy == 0">-</div>
              <div class="arrow" v-if="item.changeFromBuy < 0">▼</div>
              <div class="number change-price">{{ item.changeFromBuy }} ₪</div>
              <div class="number change-price">{{ item.changeFromBuyPercentage }} %</div>
            </div>
          </td>
          <td>
            <div class="change-cell" :class="{ up: item.changeToday > 0, down: item.changeToday < 0 }">
              <div class="arrow" v-if="item.changeToday > 0">▲</div>
              <div class="arrow" v-if="item.changeToday == 0">-</div>
              <div class="arrow" v-if="item.changeToday < 0">▼</div>
              <div class="number change-price">{{ item.changeToday }} ₪</div>
              <div class="number change-price">{{ item.changeTodayPercentage }} %</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { getSecurityInfo } from "@/services/tase.service";
import { PortfolioItem, usePortfolioStore } from "@/store/portfolio.store";
import { defineComponent } from "vue";
import { writeFile } from "../services/file.service";
import { DateTime } from "luxon";

export default defineComponent({
  name: "PortfolioView",

  setup() {
    const store = usePortfolioStore();

    const select = async (item: PortfolioItem) => {
      if (store.selected === item) {
        store.setSelected(undefined);
      } else {
        store.setSelected(item);
      }
    };

    const showChart = async (security: PortfolioItem) => {
      await router.push({ name: 'securityChart', params: { securityNumber: security.number }});
    };

    const refresh = async () => {
      const promises = store.items.map((item) => getSecurityInfo(item.number));
      const responses = await Promise.all(promises);
      responses.forEach((info) => {
        const item = store.items.find((item) => item.number === info.number)!!;
        item.lastRate = info.lastRate;
        item.changeFromBuy = (item.lastRate - item.buyRate) * item.quantity / 100;
        item.changeFromBuyPercentage = Math.round(((item.lastRate - item.buyRate) / item.buyRate) * 10000) / 100;
        item.changeToday = (item.lastRate - info.baseRate) * item.quantity / 100;
        item.changeTodayPercentage = Math.round(((item.lastRate - info.baseRate) / info.baseRate) * 10000) / 100;
      });

      store.setLastRefresh(DateTime.now().toFormat("dd/MM/yyyy HH:mm:ss"));
      writeFile("portfolio", store.portfolio);
    };

    return { store, select, showChart, refresh };
  },
});
</script>

<style lang="scss" scoped>
.portfolio-view {
  @import "../styles/table.scss";
  overflow: auto;

  .action-bar {
    display: flex;
    gap: 2em;
    align-items: center;
    margin: 0.2em 2em;
  }
}
</style>
