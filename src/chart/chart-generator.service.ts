import { max, min } from "lodash";
import { SecurityData, useChartStore } from "../store/chart.store";
import { BasicChart, Chart } from "./chart";
import { CandleStickDataProvider } from "./data-providers/candlestick.data-provider";
import { CloseRateDataProvider } from "./data-providers/close-rate.data-provider";
import { VolumeDataProvider } from "./data-providers/volume.data-provider";
import { Renderer } from "./renderer";
import { CandleStickRenderer } from "./renderers/candlestick.renderer";
import { LineRenderer } from "./renderers/line.renderer";
import { StandingBarsRenderer } from "./renderers/standing-bars.renderer";

// export type PaneDescriptor = {
//   height: number;
//   descriptor: ChartDescriptor;
// };

// interface ChartDescriptor {}

// class VolumeChartDescriptor implements ChartDescriptor {}

export function generateCharts(data: SecurityData[]) {
  const store = useChartStore();

  const securityData = store.securityData;

  const candleStickData = new CandleStickDataProvider().provide(securityData);
  const lineData = new CloseRateDataProvider().provide(securityData);
  const mainRenderers: Renderer[] = [
    new CandleStickRenderer(candleStickData),
    new LineRenderer(lineData),
  ];
  const mainChart = new BasicChart(mainRenderers, true, 0.7);

  const volumeData = new VolumeDataProvider().provide(securityData);
  const volumeRenderers: Renderer[] = [
    new StandingBarsRenderer(volumeData)
  ];
  const volumeChart = new BasicChart(volumeRenderers, false, 0.3);

  const { fromPos, toPos } = calcDomainPositions(securityData);

  return store.initCharts(fromPos, toPos, mainChart, volumeChart);
}

export type MinMax = {
  min: number;
  max: number;
};


function calcDomainPositions(data: SecurityData[]): { fromPos: number, toPos: number } {
  const toPos = data.length - 1;
  const fromPos = Math.max(0, toPos - 70);
  return { fromPos, toPos };
}
