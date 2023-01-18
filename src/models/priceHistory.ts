// https://developer.tdameritrade.com/price-history/apis/get/marketdata/%7Bsymbol%7D/pricehistory
export interface PriceHistoryConfig {
  symbol: string,
  periodType?: "day" | "month" | "year" | "ytd" // default is day,
  period?: number;
  frequencyType?: "minute" | "daily" | "weekly" | "monthly";
  frequency?: number;
  endDate?: number; // End date as milliseconds since epoch. If startDate and endDate are provided, period should not be provided. Default is previous trading day.
  startDate?: number; // Start date as milliseconds since epoch. If startDate and endDate are provided, period should not be provided.
  needExtendedHoursData?: boolean; // default is true
}

export interface PriceHistoryResponse {
  candles: Candle[];
  empty: boolean;
  symbol: string;
}

export interface Candle {
  close: number;
  datetime: number;
  high: number;
  low: number;
  open: number;
  volume: number;
}
