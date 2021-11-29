import {del, get, post, Request, ResponseType} from "../connection/connect";
import {ACCOUNTS, ORDERS} from "../connection/routes.config";
import {
  CancelOrderConfig,
  GetOrdersResponse,
  OrdersByQueryConfig,
  OrdersConfig,
  PlaceOrdersResponse
} from "../models/order";
import Any = jasmine.Any;


/*
All orders for a specific account or, if account ID isn't specified, orders will be returned for all linked accounts.
 */
export async function getOrdersByQuery(config?: OrdersByQueryConfig): Promise<GetOrdersResponse> {
  const url = ORDERS;
  const response = await get({
    url,
    responseType: ResponseType.JSON,
    params: config
  } as Request);
  return response.data
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
  const response = await post({
    url,
    data: config.order,
    responseType: ResponseType.JSON
  } as Request);
  let orderId = extractOrderIdFromUrl(response.headers.location)
  return {
    orderId
  };
}

export async function cancelOrder(config: CancelOrderConfig): Promise<Any> {
  if (!config.accountId) throw new Error("accountId is required");
  const url = generateOrderUrl(config.accountId, config.orderId)
  const response = await del({
    url,
    responseType: ResponseType.JSON
  } as Request);
  return response.data
}

function generateOrderUrl(accountId: string, orderId?: string): string {
  return `${ACCOUNTS}/${accountId}/orders${generateOrderIdUrl(orderId)}`;
}

function generateOrderIdUrl(orderId?: string) {
  return orderId ? `/${orderId}` : ""
}

function extractOrderIdFromUrl(url: string): string {
  return url.split("/").pop()
}
