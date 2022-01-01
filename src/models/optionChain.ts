export interface OptionChainConfig {
  symbol: string;
  contractType?: ContractType; // Default ALL
  strikeCount?: number;
  includeQuotes?: boolean; // Default: false
  strategy?: OptionStrategyType; // Default: Single
  interval?: number; // Strike interval for spread strategy chains
  strike?: number; // Provide a strike price to return options only at that strike price
  range?: RangeType; // Default: ALL,
  fromDate?: string; // Valid ISO-8601 formats are: yyyy-MM-dd and yyyy-MM-dd'T'HH:mm:ssz
  toDate?: string; // Valid ISO-8601 formats are: yyyy-MM-dd and yyyy-MM-dd'T'HH:mm:ssz
  volatility?: number;
  underlyingPrice?: number;
  interestRate?: number;
  daysToExpiration?: number;
  expMonth?: Month;
  optionType?: OptionType; // Default ALL
}

export enum ContractType {
  CALL = 'CALL',
  PUT = 'PUT',
  ALL = 'ALL',
}

export enum OptionStrategyType {
  SINGLE = 'SINGLE',
  ANALYTICAL = 'ANALYTICAL',
  COVERED = 'COVERED',
  VERTICAL = 'VERTICAL',
  CALENDER = 'CALENDER',
  STRANGLE = 'STRANGLE',
  STRADDLE = 'STRADDLE',
  BUTTERFLY = 'BUTTERFLY',
  CONDOR = 'CONDOR',
  DIAGONAL = 'DIAGONAL',
  COLLAR = 'COLLAR',
  ROLL = 'ROLL',
}

export enum RangeType {
  ITM = 'ITM', // In-the-money
  NTM = 'NTM', // Near-the-money
  OTM = 'OTM', // Out-of-the-money
  SAK = 'SAK', // Strikes-above-market
  SBK = 'SBK', // Strikes-below-market
  SNK = 'SNK', // Strikes-near-market
  ALL = 'ALL', // All-strikes
}

export enum Month {
  JAN = 'JAN',
  FEB = 'FEB',
  MAR = 'MAR',
  APR = 'APR',
  MAY = 'MAY',
  JUN = 'JUN',
  JUL = 'JUL',
  AUG = 'AUG',
  SEP = 'SEP',
  OCT = 'OCT',
  NOV = 'NOV',
  DEC = 'DEC',
}

export enum OptionType {
  S = 'S',
  NS = 'NS',
  ALL = 'ALL',
}

export interface OptionChainResponse {
  symbol: string;
  status: string;
  underlying: Underlying;
  strategy: OptionStrategyType;
  interval: number;
  isDelayed: boolean;
  isIndex: boolean;
  daysToExpiration: number;
  interestRate: number;
  underlyingPrice: number;
  volatility: number;
  callExpDateMap: any;
  putExpDateMap: any;
  monthlyStrategyList: MonthlyStrategy[];
}

export interface Underlying {
  ask: number;
  askSize: number;
  bid: number;
  bidSize: number;
  change: number;
  close: number;
  delayed: boolean;
  description: string;
  exchangeName: 'IND' | 'ASE' | 'NYS' | 'NAS' | 'NAP' | 'PAC' | 'OPR' | 'BATS';
  fiftyTwoWeekHigh: number;
  fiftyTwoWeekLow: number;
  highPrice: number;
  last: number;
  lowPrice: number;
  mark: number;
  markChange: number;
  markPercentChange: number;
  openPrice: number;
  percentChange: number;
  quoteTime: number;
  symbol: string;
  totalVolume: number;
  tradeTime: number;
}

export interface MonthlyStrategy {
  month: string;
  year: number;
  day: number;
  daysToExp: number;
  secondaryMonth: string;
  secondaryYear: number;
  secondaryDay: number;
  secondaryDaysToExp: number;
  type: string;
  secondaryType: string;
  leap: boolean;
  secondaryLeap: boolean;
  optionStrategyList: OptionStrategy[];
}

export interface OptionStrategy {
  primaryLeg: Option;
  secondaryLeg: Option;
  strategyStrike: string;
  strategyBid: number;
  strategyAsk: number;
}

export interface Option {
  symbol: string;
  putCallInd: string;
  description: string;
  bid: number;
  ask: number;
  range: string;
  strikePrice: number;
  totalVolume: string;
}

// https://www.wintick.com/members/symbolGuide/tda
export const symbolMap = new Map([['SPX', '$SPX.X']]);
