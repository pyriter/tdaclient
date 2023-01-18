// https://www.wintick.com/members/symbolGuide/tda

export const symbolMap = new Map([['SPX', '$SPX.X']]);

export function convertToValidSymbol(symbol: string) {
  if (symbolMap.has(symbol)) {
    return symbolMap.get(symbol) as string;
  } else {
    return symbol;
  }
}

export function convertToValidSymbols(symbols: string[]) {
  return symbols.map((symbol) => {
    return convertToValidSymbol(symbol);
  });
}
