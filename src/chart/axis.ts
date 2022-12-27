import { DateTime } from "luxon";

export interface Axis {
  min: number;
  max: number;

  toAxis(from: number): number;
  toCanvas(from: number): number;
}

export class RangeAxis implements Axis {
  constructor(public readonly min: number, public readonly max: number, public readonly canvasHeight: number) {}

  toAxis(from: number): number {
    return (from / this.canvasHeight) * (this.max - this.min);
  }

  toCanvas(from: number): number {
    return this.canvasHeight - ((from - this.min) / (this.max - this.min)) * this.canvasHeight;
  }
}

export class DomainAxis implements Axis {
  constructor(public readonly min: number, public readonly max: number, public readonly canvasWidth: number) {}

  toAxis(from: number): number {
    return (from / this.canvasWidth) * (this.max - this.min);
  }

  toCanvas(from: number): number {
    return ((from - this.min) / (this.max - this.min)) * this.canvasWidth;
  }
}
