<template>
  <table>
    <thead>
      <tr>
        <th>מספר נייר</th>
        <th>שם</th>
        <th>תאריך קנייה</th>
        <th>מחיר קנייה</th>
        <th>כמות ניירות ערך</th>
        <th>סכום קנייה (ש"ח)</th>
        <th>עמלת קנייה (%)</th>
        <th>עמלת קנייה (ש"ח)</th>
        <th>סכום קנייה + עמלת קנייה</th>
        <th>מחיר מכירה</th>
        <th>סכום מכירה (ש"ח)</th>
        <th>עמלת מכירה (%)</th>
        <th>עמלת מכירה (ש"ח)</th>
        <th>סכום מכירה + עמלת מכירה</th>
        <th>רווח</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="calculatedHolding in calculatedHoldings" :key="calculatedHolding.holding.id">
        <td>{{ calculatedHolding.holding.shareNumber }}</td>
        <td>{{ calculatedHolding.holding.shareName }}</td>
        <td>{{ formatDate(calculatedHolding.holding.buyDate) }}</td>
        <td>{{ calculatedHolding.holding.buyQuote }}</td>
        <td>{{ calculatedHolding.holding.numberOfShares }}</td>
        <td class="autoCalc">{{ calculatedHolding.buyPrice }}</td>
        <td>{{ calculatedHolding.holding.buyCommissionFeePercent }}</td>
        <td>{{ calculatedHolding.holding.minBuyCommissionFee }}</td>
        <td class="autoCalc">{{ calculatedHolding.totalBuyPrice}}</td>
        <td>{{ calculatedHolding.holding.sellQuote }}</td>
        <td class="autoCalc">{{ calculatedHolding.sellPrice}}</td>
        <td>{{ calculatedHolding.holding.sellCommissionFeePercent }}</td>
        <td>{{ calculatedHolding.holding.minSellCommissionFee }}</td>
        <td class="autoCalc">{{ calculatedHolding.totalSellPrice}}</td>
        <td class="autoCalc">{{ calculatedHolding.profit}}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import moment from "moment";

type HoldingData = {
  id: string,
  shareNumber: string;
  shareName: string;
  buyDate: Date;
  buyQuote: number;
  numberOfShares: number;
  buyCommissionFeePercent: number;
  minBuyCommissionFee: number;
  sellQuote: number;
  sellCommissionFeePercent: number;
  minSellCommissionFee: number;
}

type CalculatedHoldingData = {
  holding: HoldingData;
  buyPrice: number;
  totalBuyPrice: number;
  sellPrice: number;
  totalSellPrice: number;
  profit: number;
}

export default defineComponent({
  name: "HoldingsTable",

  setup() {
    const holdings = JSON.parse(fs.readFileSync("C:/Users/User/OneDrive/investments/holdings.json").toString()) as HoldingData[];

    const calculatedHoldings = holdings.map((it) => {
      const buyPrice = (it.numberOfShares * it.buyQuote) / 100;
      const sellPrice = (it.numberOfShares * it.sellQuote) / 100;
      const totalBuyPrice = it.minBuyCommissionFee + buyPrice;
      const totalSellPrice = it.minSellCommissionFee + sellPrice;
      const profit = totalSellPrice - totalBuyPrice;
      return {
        holding: it,
        buyPrice,
        totalBuyPrice,
        sellPrice,
        totalSellPrice,
        profit,
      } as CalculatedHoldingData;
    })

    const formatDate = (date: Date) => {
      return moment(date).format("DD/MM/YYYY")
    };

    return { calculatedHoldings, formatDate };
  }
});
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
}

thead {
  background-color: rgb(208, 228, 208);
  border-bottom: 1px solid gray;
}

tr {
  th {
    padding: 0.3em 1em;
    border-left: 1px solid lightgray;
    white-space: nowrap;
  }
  td {
    border-left: 1px solid lightgray;
    white-space: nowrap;

    &.autoCalc {
      background-color: lightgray;
    }
  }
}
</style>
