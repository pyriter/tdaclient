export interface Instrument {
  symbol: string;
  assetType: string;
}

export interface WatchlistItem {
  sequenceId: number;
  quantity: number;
  averagePrice: number;
  commission: number;
  instrument: Instrument;
}

export interface Watchlist {
  name: string;
  watchlistId: string;
  accountId: string;
  watchlistItems: WatchlistItem[];
}

export interface WatchListConfig {
  accountId?: string;
}
