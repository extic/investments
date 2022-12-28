import { Quote, QuotePosition, DomainContext } from "../store/chart.store";
import { DomainAxis } from "./axis";

export function createDomainContext(fromPos: number, toPos: number, canvasWidth: number, quotes: Quote[]): DomainContext {
  const fromIndex = Math.max(0, Math.floor(fromPos));
  const toIndex = Math.min(quotes.length - 1, Math.ceil(toPos));
  const quoteWidth = (canvasWidth - 100) / (toPos - fromPos);
  const ratio = (canvasWidth - 100) / (toPos - fromPos);

  const positions = quotes.slice(fromIndex, toIndex + 1).map((it, index) => {
    return {
      date: it.tradeDateMillis,
      index: index + fromIndex,
      pos: Math.round((index + (fromIndex - fromPos)) * ratio),
      major: false,
      quote: quotes[index + fromIndex],
    } as QuotePosition;
  });

  const majorInterval = getMajorInterval(quoteWidth);
  for (let i = positions.length - 1; i >= 0; i -= majorInterval) {
    positions[i].major = true;
  }

  const domainAxis = new DomainAxis(fromPos, toPos, 0, canvasWidth - 100);

  return { quoteWidth, fromIndex, toIndex, quotePositions: positions, canvasWidth, domainAxis };
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
