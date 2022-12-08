import { useChartStore } from "../store/chart-store";
import data from "../data/data.json";
import { nextTick } from "vue";
import { VolumeDataProvider } from "./volume.data-provider";
import { ChartRenderer } from "./chart.renderer";
import { StandingBarChartRenderer } from "./standing-bar.chart-renderer";

export type PaneDescriptor = {
  height: number;
  descriptor: ChartDescriptor;
};

interface ChartDescriptor {}

class VolumeChartDescriptor implements ChartDescriptor {}

export function generateChartPanes() {
  const store = useChartStore();

  const volumeData = new VolumeDataProvider().provide(data);
  const renderers: ChartRenderer[] = [new StandingBarChartRenderer(400, volumeData)];
  store.setChartRenderers(renderers);

  nextTick(() => {
    store.setSecurityData(data.reverse());
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


