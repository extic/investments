import { Quote } from "../../store/chart.store";
import { DataProvider } from "../data-provider";

export class VolumeDataProvider implements DataProvider<Quote, number> {
  public provide(data: Quote[]): number[] {
    return data.map((it) => it.volume);
  }
}
