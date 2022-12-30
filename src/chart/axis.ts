export class RangeAxis {
  constructor(
    public readonly chartMin: number,
    public readonly chartMax: number,
    public readonly canvasMin: number,
    public readonly canvasMax: number
  ) {}

  toChart(from: number): number {
    return (from - this.canvasMin) / (this.canvasMax - this.canvasMin) * (this.chartMax - this.chartMin) + this.chartMin;
  }

  toCanvas(from: number): number {
    return ((from - this.chartMin) / (this.chartMax - this.chartMin)) * (this.canvasMax - this.canvasMin);
  }
}

export class DomainAxis {
  constructor(
    public readonly chartMin: number,
    public readonly chartMax: number,
    public readonly canvasMin: number,
    public readonly canvasMax: number
  ) {}

  toChart(from: number): number {
    return (from - this.canvasMin) / (this.canvasMax - this.canvasMin) * (this.chartMax - this.chartMin) + this.chartMin;
  }

  toCanvas(from: number): number {
    return ((from - this.chartMin) / (this.chartMax - this.chartMin)) * (this.canvasMax - this.canvasMin);
  }
}
