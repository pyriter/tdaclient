import {ArrayFormatType, Request, ResponseType} from '../models/connect';
import {ACCOUNTS, ORDERS} from '../connection/routes.config';
import {
  CancelOrderConfig,
  GetOrderConfig,
  Order,
  OrderGet,
  OrdersByQueryConfig,
  OrdersConfig,
  PlaceOrdersResponse,
} from '../models/order';
import client from '../connection/client';
import {round} from '../utils/round';

export async function getOrder(config: GetOrderConfig): Promise<OrderGet> {
  const {accountId, orderId} = config;
  const url = `${ACCOUNTS}/${accountId}/orders/${orderId}`;
  const response = await client.get({
    url,
    responseType: ResponseType.JSON,
    arrayFormat: ArrayFormatType.COMMA,
  } as Request);
  return response.data;
}

/*
All orders for a specific account or, if account ID isn't specified, orders will be returned for all linked accounts.
 */
export async function getOrdersByQuery(config?: OrdersByQueryConfig): Promise<OrderGet[]> {
  const url = ORDERS;
  const response = await client.get({
    url,
    params: config,
    responseType: ResponseType.JSON,
    arrayFormat: ArrayFormatType.COMMA,
  } as Request);
  return response.data;
}

/*
Place an order for a specific account.
Order throttle limits may apply.
Click here [https://developer.tdameritrade.com/content/place-order-samples]
for to see our Place Order Samples Guide for more information around order
throttles and examples of orders.
 */
export async function placeOrder(config: OrdersConfig): Promise<PlaceOrdersResponse> {
  const url = generateOrderUrl(config.accountId);
  const order = processOrder(config.order);
  const response = await client.post({
    url,
    data: order,
    responseType: ResponseType.JSON,
    arrayFormat: ArrayFormatType.COMMA,
  } as Request);
  const orderId = extractOrderIdFromUrl(response.headers.location);
  return {
    orderId,
  };
}

function processOrder(order: Order): Order {
  if (!order.price) return order;
  const price = Number(order.price.toFixed(2)) * 100;
  order.price = round(price, 5) / 100;
  return order;
}

export async function cancelOrder(config: CancelOrderConfig): Promise<any> {
  if (!config.accountId) throw new Error('accountId is required');
  const url = generateOrderUrl(config.accountId, config.orderId);
  const response = await client.del({
    url,
    responseType: ResponseType.JSON,
    arrayFormat: ArrayFormatType.COMMA,
  } as Request);
  return response.data;
}

function generateOrderUrl(accountId: string, orderId?: string): string {
  return `${ACCOUNTS}/${accountId}/orders${generateOrderIdUrl(orderId)}`;
}

function generateOrderIdUrl(orderId?: string) {
  return orderId ? `/${orderId}` : '';
}

function extractOrderIdFromUrl(url: string): string {
  const orderId = url.split('/').pop();
  if (!orderId || orderId.trim().length === 0) throw new Error('Unable to extract order Id');
  return orderId;
}
