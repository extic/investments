import { QuotePosition, RenderContext, SecurityData } from "../store/chart.store";

export function createRenderContext(fromPos: number, toPos: number, width: number, data: SecurityData[]): RenderContext {
  const fromIndex = Math.max(0, Math.floor(fromPos));
  const toIndex = Math.min(data.length - 1, Math.ceil(toPos));
  const quoteWidth = (width - 100) / (toPos - fromPos)
  const ratio = (width - 100) / (toPos - fromPos);

  const positions = data.slice(fromIndex + 1, toIndex + 1).map((it, index) => {
    return {
      date: it.tradeDate,
      index: index + fromIndex + 1,
      pos: Math.round((index + 1) * ratio - quoteWidth / 2),
    } as QuotePosition;
  });

  return { quoteWidth, fromIndex, toIndex, quotePositions: positions, width};
}
