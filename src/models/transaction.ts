export interface GetTransactionsConfig {
  accountId: string;
  transactionId?: string;
}

export enum QueryTransactionType {
  ALL = 'ALL',
  TRADE = 'TRADE',
  BUY_ONLY = 'BUY_ONLY',
  SELL_ONLY = 'SELL_ONLY',
  CASH_IN_OR_CASH_OUT = 'CASH_IN_OR_CASH_OUT',
  CHECKING = 'CHECKING',
  DIVIDEND = 'DIVIDEND',
  INTEREST = 'INTEREST',
  OTHER = 'OTHER',
  ADVISOR_FEES = 'ADVISOR_FEES',
}

export interface GetTransactionsByQueryConfig {
  accountId: string;
  type?: QueryTransactionType;
  symbol?: string;
  startDate?: string;
  endDate?: string;
}

export enum TransactionType {
  TRADE = 'TRADE',
  RECEIVE_AND_DELIVER = 'RECEIVE_AND_DELIVER',
  DIVIDEND_OR_INTEREST = 'DIVIDEND_OR_INTEREST',
  ACH_RECEIPT = 'ACH_RECEIPT',
  ACH_DISBURSEMENT = 'ACH_DISBURSEMENT',
  CASH_RECEIPT = 'CASH_RECEIPT',
  CASH_DISBURSEMENT = 'CASH_DISBURSEMENT',
  ELECTRONIC_FUND = 'ELECTRONIC_FUND',
  WIRE_OUT = 'WIRE_OUT',
  WIRE_IN = 'WIRE_IN',
  JOURNAL = 'JOURNAL',
  MEMORANDUM = 'MEMORANDUM',
  MARGIN_CALL = 'MARGIN_CALL',
  MONEY_MARKET = 'MONEY_MARKET',
  SMA_ADJUSTMENT = 'SMA_ADJUSTMENT',
}

export enum AchStatusType {
  Approved = 'Approved',
  Rejected = 'Rejected',
  Cancel = 'Cancel',
  Error = 'Error',
}

export interface Transaction {
  type: TransactionType;
  clearingReferenceNumber: string;
  subAccount: string;
  settlementDate: string;
  orderId: string;
  sma: number;
  requirementReallocationAmount: number;
  dayTradeBuyingPowerEffect: number;
  netAmount: number;
  transactionDate: string;
  orderDate: string;
  transactionSubType: string;
  transactionId: string;
  cashBalanceEffectFlag: boolean;
  description: string;
  achStatus: AchStatusType;
  accruedInterest: number;
  fees: object;
  transactionItem: TransactionItem;
}

export interface TransactionItem {
  accountId: number;
  amount: number;
  price: number;
  cost: number;
  parentOrderKey: number;
  parentChildIndicator: string;
  instruction: string;
  positionEffect: string;
  instrument: TransactionInstrument;
}

export interface TransactionInstrument {
  symbol: string;
  underlyingSymbol: string;
  optionExpirationDate: string;
  optionStrikePrice: number;
  putCall: string;
  cusip: string;
  description: string;
  assetType: string;
  bondMaturityDate: string;
  bondInterestRate: number;
}
