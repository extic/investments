export class RangeAxis {
  constructor(
    public readonly screenMin: number,
    public readonly screenMax: number,
    public readonly canvasMin: number,
    public readonly canvasMax: number
  ) {}

  toScreen(from: number): number {
    return (from - this.canvasMin) / (this.canvasMax - this.canvasMin) * (this.screenMax - this.screenMin) + this.screenMin;
  }

  toCanvas(from: number): number {
    return this.canvasMax - ((from - this.screenMin) / (this.screenMax - this.screenMin)) * (this.canvasMax - this.canvasMin);
  }
}

export class DomainAxis {
  constructor(
    public readonly screenMin: number,
    public readonly screenMax: number,
    public readonly canvasMin: number,
    public readonly canvasMax: number
  ) {}

  toScreen(from: number): number {
    return (from - this.canvasMin) / (this.canvasMax - this.canvasMin) * (this.screenMax - this.screenMin) + this.screenMin;
  }

  toCanvas(from: number): number {
    return ((from - this.screenMin) / (this.screenMax - this.screenMin)) * (this.canvasMax - this.canvasMin);
  }
}
