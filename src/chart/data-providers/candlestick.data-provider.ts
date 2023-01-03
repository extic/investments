import { Quote } from "../../store/chart.store";
import { DataProvider } from "../data-provider";

export type CandleStickData = {
  high: number;
  low: number;
  close: number;
  open: number;
}

export class CandleStickDataProvider implements DataProvider<Quote, CandleStickData> {
  public provide(data: Quote[]): CandleStickData[] {
    return data.map((it) => {
      return {
        high: it.highRate,
        low: it.lowRate,
        close: it.closeRate,
        open: it.openRate,
      } as CandleStickData
    });
  }
}

