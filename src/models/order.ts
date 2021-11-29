export interface PlaceOrdersResponse {
  orderId: string
}

export interface OrdersConfig {
  accountId: string,
  order: Order,
}

export interface CancelOrderConfig {
  accountId: string,
  orderId: string
}

export interface Order {
  orderType: OrderType,
  price: number,
  session: SessionType,
  duration: DurationType,
  orderStrategyType: OrderStrategyType,
  orderLegCollection: OrderLeg[]
}

export enum OrderType {
  MARKET = "MARKET",
  LIMIT = "LIMIT",
  STOP = "STOP",
  STOP_LIMIT = "STOP_LIMIT",
  TRAILING_STOP = "TRAILING_STOP",
  MARKET_ON_CLOSE = "MARKET_ON_CLOSE",
  EXERCISE = "EXERCISE",
  TRAILING_STOP_LIMIT = "TRAILING_STOP_LIMIT",
  NET_DEBIT = "NET_DEBIT",
  NET_CREDIT = "NET_CREDIT",
  NET_ZERO = "NET_ZERO"
}

export enum SessionType {
  NORMAL = "NORMAL",
  AM = "AM",
  PM = "PM",
  SEAMLESS = "SEAMLESS"
}

export enum DurationType {
  DAY = "DAY",
  GOOD_TILL_CANCEL = "GOOD_TILL_CANCEL",
  FILL_OR_KILL = "FILL_OR_KILL"
}

export enum OrderStrategyType {
  SINGLE = "SINGLE",
  OCO = "OCO",
  TRIGGER = "TRIGGER"
}

export interface OrderLeg {
  instruction: InstructionType,
  quantity: number,
  instrument: Instrument
}

export enum InstructionType {
  BUY = "BUY",
  SELL = "SELL",
  BUY_TO_COVER = "BUY_TO_COVER",
  SELL_SHORT = "SELL_SHORT",
  BUY_TO_OPEN = "BUY_TO_OPEN",
  BUY_TO_CLOSE = "BUY_TO_CLOSE",
  SELL_TO_OPEN = "SELL_TO_OPEN",
  SELL_TO_CLOSE = "SELL_TO_CLOSE",
  EXCHANGE = "EXCHANGE"
}

export interface Instrument {
  symbol: string,
  assetType: AssetType
}

export enum AssetType {
  EQUITY = "EQUITY",
  OPTION = "OPTION",
  INDEX = "INDEX",
  MUTUAL_FUND = "MUTUAL_FUND",
  CASH_EQUIVALENT = "CASH_EQUIVALENT",
  FIXED_INCOME = "FIXED_INCOME",
  CURRENCY = "CURRENCY"
}

export interface OrdersByQueryConfig {
  accountId?: string,
  maxResults?: number,
  fromEnteredTime?: string, // yyyy-MM-dd,
  toEnteredTime?: string, // yyyy-MM-dd
  status?:
    | "AWAITING_PARENT_ORDER"
    | "AWAITING_CONDITION"
}

export interface GetOrdersResponse {
  session: SessionType,
  duration: DurationType
  orderType: OrderType
}
