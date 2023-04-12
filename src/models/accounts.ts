export interface AccountConfig {
  accountId?: string;
  fields?: any;
}

export interface InitialBalances {
  accruedInterest: number,
  availableFundsNonMarginableTrade: number,
  bondValue: number,
  buyingPower: number,
  cashBalance: number,
  cashAvailableForTrading: number,
  cashReceipts: number,
  dayTradingBuyingPower: number,
  dayTradingBuyingPowerCall: number,
  dayTradingEquityCall: number,
  equity: number,
  equityPercentage: number,
  liquidationValue: number,
  longMarginValue: number,
  longOptionMarketValue: number,
  longStockValue: number,
  maintenanceCall: number,
  maintenanceRequirement: number,
  margin: number,
  marginEquity: number,
  moneyMarketFund: number,
  mutualFundValue: number,
  regTCall: number,
  shortMarginValue: number,
  shortOptionMarketValue: number,
  shortStockValue: number,
  totalCash: number,
  isInCall: boolean,
  unsettledCash: number,
  pendingDeposits: number,
  marginBalance: number,
  shortBalance: number,
  accountValue: number
}

export interface Balances {
  accruedInterest: number;
  cashBalance: number;
  cashReceipts: number;
  longOptionMarketValue: number;
  liquidationValue: number;
  longMarketValue: number;
  moneyMarketFund: number;
  savings: number;
  shortMarketValue: number;
  pendingDeposits: number;
  cashAvailableForTrading: number;
  cashAvailableForWithdrawal: number;
  cashCall: number;
  longNonMarginableMarketValue: number;
  totalCash: number;
  shortOptionMarketValue: number;
  mutualFundValue: number;
  bondValue: number;
  cashDebitCallValue: number;
  unsettledCash: number;
  availableFunds: number;
  availableFundsNonMarginableTrade: number;
  buyingPower: number;
  buyingPowerNonMarginableTrade: number;
  dayTradingBuyingPower: number;
  dayTradingBuyingPowerCall: number;
  equity: number;
  equityPercentage: number;
  longMarginValue: number;
  maintenanceCall: number;
  maintenanceRequirement: number;
  marginBalance: number;
  regTCall: number;
  shortBalance: number;
  shortMarginValue: number;
  sma: number;
  isInCall: boolean;
  stockBuyingPower: number;
  optionBuyingPower: number;
}

export interface SecuritiesAccount {
  type: string;
  accountId: string;
  roundTrips: number;
  isDayTrader: boolean;
  isClosingOnlyRestricted: boolean;
  initialBalances: InitialBalances;
  currentBalances: Balances;
  projectedBalances: Balances;
}
