export function round(value: number, interval?: undefined | 5 | 10): number {
  const v = Math.round(value);
  if (interval === 5) {
    const tenthValue = roundIntervalFive(v % 10);
    return Math.floor(v / 10) * 10 + tenthValue;
  } else if (interval === 10) {
    return Math.round(v / 10) * 10;
  } else {
    return v;
  }
}

function roundIntervalFive(tenth: number): number {
  return intervalFive.get(tenth) as number;
}

const intervalFive = new Map([
  [0, 0],
  [1, 0],
  [2, 0],
  [3, 5],
  [4, 5],
  [5, 5],
  [6, 5],
  [7, 5],
  [8, 10],
  [9, 10]
]);
