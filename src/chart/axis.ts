import { DateTime } from "luxon";

export class Axis {
  constructor(public readonly min: number, public readonly max: number, public readonly canvasHeight: number) {}

  toAxis(from: number): number {
    return (from / this.canvasHeight) * (this.max - this.min);
  }

  toCanvas(from: number): number {
    return this.canvasHeight - ((from - this.min) / (this.max - this.min)) * this.canvasHeight;
  }

  toString(point: number): string {
    return DateTime.fromMillis(point).toLocaleString(DateTime.DATE_SHORT);
  }
}
