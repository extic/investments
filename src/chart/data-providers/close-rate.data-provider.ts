import { SecurityData } from "../../store/chart.store";
import { DataProvider } from "../data-provider";

export type CandleStickData = {
  high: number;
  low: number;
  close: number;
  open: number;
}

export class CloseRateDataProvider implements DataProvider<SecurityData, number> {
  public provide(data: SecurityData[]): number[] {
    return data.map((it) => it.closeRate );
  }
}

