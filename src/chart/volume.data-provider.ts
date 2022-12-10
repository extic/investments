import { SecurityData } from "../store/chart.store";
import { DataProvider } from "./data.provider";

export class VolumeDataProvider implements DataProvider<SecurityData, number> {
  public provide(data: SecurityData[]): number[] {
    console.log(data.map((it) => it.volume))
    return data.map((it) => it.volume);
  }
}
