export interface AccountConfig {
  accountId?: string;
  fields?: any;
}

export interface InitialBalances {
  accruedInterest: number;
  cashAvailableForTrading: number;
  cashAvailableForWithdrawal: number;
  cashBalance: number;
  bondValue: number;
  cashReceipts: number;
  liquidationValue: number;
  longOptionMarketValue: number;
  longStockValue: number;
  moneyMarketFund: number;
  mutualFundValue: number;
  shortOptionMarketValue: number;
  shortStockValue: number;
  isInCall: boolean;
  unsettledCash: number;
  cashDebitCallValue: number;
  pendingDeposits: number;
  accountValue: number;
}

interface CurrentBalances {
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

interface ProjectBalances {
  cashAvailableForTrading: number;
  cashAvailableForWithdrawal: number;
}

export interface SecuritiesAccount {
  type: string;
  accountId: string;
  roundTrips: number;
  isDayTrader: boolean;
  isClosingOnlyRestricted: boolean;
  initialBalances: InitialBalances;
  currentBalances: CurrentBalances;
  projectBalances: ProjectBalances;
}
