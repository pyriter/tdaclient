export interface HoursConfig {
  markets?: MarketType[];
  apiKey?: string;
  date?: string; // formats are yyyy-MM-dd or yyyy-MM-dd'T'HH:mm:ssz
}

export type MarketType = 'EQUITY' | 'OPTION' | 'FUTURE' | 'BOND' | 'FOREX';

export interface Hour {
  category: string;
  date: string;
  exchange: string;
  isOpen: boolean;
  marketType: MarketType;
  product: string;
  productName: string;
  sessionHours: SessionHour;
}

export interface SessionHour {
  preMarket: StartEnd[];
  regularMarket: StartEnd[];
  postMarket: StartEnd[];
}

export interface StartEnd {
  start: string;
  end: string;
}

export interface HoursResponse {
  equity?: { [key: string]: Hour };
  option?: { [key: string]: Hour };
  future?: { [key: string]: Hour };
  forex?: { [key: string]: Hour };
  bond?: { [key: string]: Hour };
}
