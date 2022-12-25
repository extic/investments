import { QuotePosition, RenderContext, SecurityData } from "../store/chart.store";

export function createRenderContext(fromPos: number, toPos: number, width: number, data: SecurityData[]): RenderContext {
  const fromIndex = Math.max(0, Math.floor(fromPos));
  const toIndex = Math.min(data.length - 1, Math.ceil(toPos));
  const quoteWidth = (width - 100) / (toPos - fromPos)
  const ratio = (width - 100) / (toPos - fromPos);

  const positions = data.slice(fromIndex + 1, toIndex + 1).map((it, index) => {
    const securityData = data[index];
    return {
      date: it.tradeDate,
      index: index + fromIndex + 1,
      pos: Math.round((index + 1) * ratio - quoteWidth / 2),
      major: false,
      data: securityData
    } as QuotePosition;
  });

  const majorInterval = getMajorInterval(quoteWidth);
  for (let i = positions.length - 1; i >= 0; i -= majorInterval) {
    positions[i].major = true;
  }

  console.log(majorInterval, positions);

  return { quoteWidth, fromIndex, toIndex, quotePositions: positions, width};
}

const getMajorInterval = (width: number) => {
  if (width > 120) {
    return 1;
  }
  if (width > 50) {
    return 2;
  }
  if (width > 25) {
    return 4;
  }
  if (width > 18) {
    return 5;
  }
  if (width > 15) {
    return 7;
  }
  if (width > 10) {
    return 9;
  }
  return 14;
};
