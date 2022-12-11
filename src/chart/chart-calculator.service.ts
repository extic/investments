import { useChartStore } from "../store/chart.store";

class ChartRecalculator {
  public recalc() {
    const store = useChartStore();

    const scrollPosition = store.scrollPosition
    const scrollLength = store.scrollLength
    const chartWidth = store.chartWidth
    // const dataLength = 1000;
    const dataLength = store.securityData.length;
    const maxIndexes = Math.min(500000, dataLength);

    const endIndex = Math.ceil((scrollPosition + scrollLength) * (dataLength - 10)) + 10;
    const indexCount = (maxIndexes - 10) * scrollLength + 10;

    const quoteWidth = chartWidth / indexCount;

    store.setIndexes(Math.floor(endIndex - indexCount), endIndex, quoteWidth);
  }
}

const chartRecalculator = new ChartRecalculator();
export default chartRecalculator;

