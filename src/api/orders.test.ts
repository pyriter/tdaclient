import {cancelOrder, getOrdersByQuery, placeOrder} from './orders';
import {getAccount} from './accounts';
import {
  AssetType,
  ComplexOrderStrategyType,
  DurationType,
  InstructionType,
  OptionInstrument,
  Order,
  OrderLegType,
  OrdersConfig,
  OrderStrategyType,
  OrderType,
  PutCall,
  SessionType,
} from '../models/order';
import {setupLocalFileCredentialProvider} from '../utils/testUtils';
import {SecuritiesAccount} from '../models/accounts';
import {getOptionChain} from './optionChain';
import {ContractType, Month, OptionChainConfig, OptionStrategyType, RangeType} from '../models/optionChain';
import {getQuotes} from './quotes';
import {QuotesIndex} from '../models/quotes';
import {convertToMonth} from '../utils/month';

describe('Orders', () => {
  let validAccount;
  beforeAll(async () => {
    await setupLocalFileCredentialProvider();
    validAccount = await checkForValidAccount();
  });

  it('should be able to get all orders for all linked accounts', async () => {
    const response = await getOrdersByQuery();

    expect(response);
  });

  it('should be able to get orders for a specific account given an account id', async () => {
    // Get account
    const accountResponse = await getAccount();
    const accountId = accountResponse[0].accountId;
    const response = await getOrdersByQuery({accountId});

    expect(response);
  });

  it('should be able to place a stock order and then cancel it', async () => {
    const accountId = validAccount.accountId;
    const order = {
      orderType: OrderType.LIMIT,
      price: 10.0,
      session: SessionType.NORMAL,
      duration: DurationType.DAY,
      orderStrategyType: OrderStrategyType.SINGLE,
      orderLegCollection: [
        {
          instruction: InstructionType.BUY,
          quantity: 1,
          instrument: {
            symbol: 'PLTR',
            assetType: AssetType.EQUITY,
          },
        },
      ],
    } as Order;
    const orderConfig = {
      accountId,
      order,
    } as OrdersConfig;

    const placeOrdersResponse = await placeOrder(orderConfig);
    const orderId = placeOrdersResponse.orderId;

    const cancelOrderResponse = await cancelOrder({
      accountId,
      orderId,
    });

    expect(placeOrdersResponse);
    expect(cancelOrderResponse);
  });

  it('should be able to place a put credit spread and then cancel it', async () => {
    const symbol = 'SPX';
    const quotesResponse = await getQuotes({
      symbols: [symbol],
    });

    const spx = quotesResponse[0] as QuotesIndex;

    console.log(spx.lastPrice);
    const accountId = validAccount.accountId;
    const optionChainResponse = await getOptionChain({
      symbol,
      strike: spx.closePrice - 20, // TODO: Get the price by querying the market
      interval: 5,
      contractType: ContractType.PUT,
      strategy: OptionStrategyType.VERTICAL,
      range: RangeType.OTM,
      expMonth: convertToMonth(new Date().getMonth()),
    } as OptionChainConfig);
    const {optionStrategyList} = optionChainResponse.monthlyStrategyList[0];

    const {primaryLeg, secondaryLeg, strategyBid, strategyAsk} = optionStrategyList[0];

    const price = (strategyBid + strategyAsk) / 2;
    const order = {
      orderType: OrderType.NET_CREDIT,
      price: price,
      session: SessionType.NORMAL,
      duration: DurationType.DAY,
      orderStrategyType: OrderStrategyType.SINGLE,
      complexOrderStrategyType: ComplexOrderStrategyType.VERTICAL,
      orderLegCollection: [
        {
          orderLegType: OrderLegType.OPTION,
          instruction: InstructionType.SELL_TO_OPEN,
          quantity: 1,
          instrument: {
            assetType: AssetType.OPTION,
            putCall: PutCall.PUT,
            symbol: primaryLeg.symbol,
          } as OptionInstrument,
        },
        {
          orderLegType: OrderLegType.OPTION,
          instruction: InstructionType.BUY_TO_OPEN,
          quantity: 1,
          instrument: {
            assetType: AssetType.OPTION,
            putCall: PutCall.PUT,
            symbol: secondaryLeg.symbol,
          },
        },
      ],
    } as Order;
    const orderConfig = {
      accountId,
      order,
    } as OrdersConfig;

    const placeOrdersResponse = await placeOrder(orderConfig);
    const orderId = placeOrdersResponse.orderId;

    await cancelOrder({
      accountId,
      orderId,
    });

    expect(placeOrdersResponse.orderId).toBeTruthy();
  });

  async function checkForValidAccount(): Promise<SecuritiesAccount> {
    const accountResponse = await getAccount();
    const validAccount = accountResponse.filter((r) => r.currentBalances.buyingPower > 10).pop();
    if (!validAccount) {
      throw Error('Since there is no money in account, we cannot run this test');
    }
    return validAccount;
  }
});
