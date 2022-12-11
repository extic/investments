import { SecurityData } from "../store/chart.store";
import { DataProvider } from "./data.provider";

export class VolumeDataProvider implements DataProvider<SecurityData, number> {
  public provide(data: SecurityData[]): number[] {
    return data.map((it) => it.volume);
  }
}
