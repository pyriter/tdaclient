import { cancelOrder, getOrdersByQuery, placeOrder } from './orders';
import { getAccount } from './accounts';
import {
  AssetType,
  DurationType,
  InstructionType,
  Order,
  OrdersConfig,
  OrderStrategyType,
  OrderType,
  SessionType,
} from '../models/order';

describe('Orders', () => {
  it('should be able to get all orders for all linked accounts', async () => {
    const response = await getOrdersByQuery();

    expect(response);
  });

  it('should be able to get orders for a specific account given an account id', async () => {
    // Get account
    const accountResponse = await getAccount();
    const accountId = accountResponse[0].accountId;
    const response = await getOrdersByQuery({ accountId });

    expect(response);
  });

  it('should be able to place a stock order and then cancel it', async () => {
    const accountResponse = await getAccount();
    const validAccount = accountResponse.filter((r) => r.initialBalances.cashAvailableForTrading > 100).pop();
    if (!validAccount) throw Error('No valid account id');

    const accountId = validAccount.accountId;
    const order = {
      orderType: OrderType.LIMIT,
      price: 100.0,
      session: SessionType.NORMAL,
      duration: DurationType.DAY,
      orderStrategyType: OrderStrategyType.SINGLE,
      orderLegCollection: [
        {
          instruction: InstructionType.BUY,
          quantity: 1,
          instrument: {
            symbol: 'AAPL',
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
});
