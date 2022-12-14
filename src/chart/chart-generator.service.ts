import { max, min } from "lodash";
import { Quote, useChartStore } from "../store/chart.store";
import { BasicChart, Chart } from "./chart";
import { CandleStickDataProvider } from "./data-providers/candlestick.data-provider";
import { CloseRateDataProvider } from "./data-providers/close-rate.data-provider";
import { VolumeDataProvider } from "./data-providers/volume.data-provider";
import { LineDrawing } from "./drawings/line.drawing";
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

export function generateCharts(data: Quote[]) {
  const store = useChartStore();

  const securityData = store.quotes;

  const candleStickData = new CandleStickDataProvider().provide(securityData);
  const lineData = new CloseRateDataProvider().provide(securityData);
  const mainRenderers: Renderer[] = [
    new CandleStickRenderer(candleStickData),
    // new LineRenderer(lineData),
  ];
  const mainChart = new BasicChart("main", mainRenderers, 0.7);

  const volumeData = new VolumeDataProvider().provide(securityData);
  const volumeRenderers: Renderer[] = [
    new StandingBarsRenderer(volumeData)
  ];
  const volumeChart = new BasicChart("volume", volumeRenderers, 0.3);

  const { fromPos, toPos } = calcDomainPositions(securityData);

  return store.initCharts(fromPos, toPos, mainChart, volumeChart);
}

function calcDomainPositions(data: Quote[]): { fromPos: number, toPos: number } {
  const toPos = data.length - 1;
  const fromPos = Math.max(0, toPos - 70);
  return { fromPos, toPos };
}
