import { Quote } from "../../store/chart.store";
import { DataProvider } from "../data-provider";

export type CandleStickData = {
  high: number;
  low: number;
  close: number;
  open: number;
}

export class CloseRateDataProvider implements DataProvider<Quote, number> {
  public provide(data: Quote[]): number[] {
    return data.map((it) => it.closeRate );
  }
}

