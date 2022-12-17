import { SecurityData, useChartStore } from "../store/chart.store";
import { nextTick } from "vue";
import { CandleStickDataProvider } from "./candlestick.data-provider";
import { ChartRenderer } from "./chart.renderer";
import { StandingBarChartRenderer } from "./standing-bar.chart-renderer";
import { CandleStickChartRenderer } from "./candlestick.chart-renderer";
import { VolumeDataProvider } from "./volume.data-provider";


export type PaneDescriptor = {
  height: number;
  descriptor: ChartDescriptor;
};

interface ChartDescriptor {}

class VolumeChartDescriptor implements ChartDescriptor {}

export function generateChartPanes(data: SecurityData[]) {
  const store = useChartStore();

  const securityData = store.securityData;

  const candleStickData = new CandleStickDataProvider().provide(securityData);
  const volumeData = new VolumeDataProvider().provide(securityData);
  const renderers: ChartRenderer[] = [new CandleStickChartRenderer(400, candleStickData), new StandingBarChartRenderer(200, volumeData)];
  store.setChartRenderers(renderers);

  nextTick(() => {
    // store.setSecurityData(securityData);
    store.setIndexes(0, 10, 10);
    store.setScroll(0, 1);
  });

  // return [{
  //   height: 400,
  //   descriptor: {} as VolumeChartDescriptor,
  // }];
}

export type MinMax = {
  min: number;
  max: number;
};
