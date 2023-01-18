import { MarketType } from '../models/hours';

const ROUTES = {
  hostname: 'https://api.tdameritrade.com',
  endpoints: {
    oauth2Token: '/v1/oauth2/token',
    auth: '/auth',
    accounts: '/v1/accounts',
    orders: '/v1/orders',
    optionChain: '/v1/marketdata/chains',
    quotes: '/v1/marketdata/quotes',
    hours: '/v1/marketdata/hours',
  },
};

export const AUTHENTICATION = `${ROUTES.hostname}${ROUTES.endpoints.oauth2Token}`;
export const ACCOUNTS = `${ROUTES.hostname}${ROUTES.endpoints.accounts}`;
export const OAUTH2_TOKEN = `${ROUTES.hostname}${ROUTES.endpoints.oauth2Token}`;
export const ORDERS = `${ROUTES.hostname}${ROUTES.endpoints.orders}`;
export const OPTION_CHAIN = `${ROUTES.hostname}${ROUTES.endpoints.optionChain}`;
export const QUOTES = `${ROUTES.hostname}${ROUTES.endpoints.quotes}`;
export const HOURS = `${ROUTES.hostname}${ROUTES.endpoints.hours}`;
export const PRICE_HISTORY = (symbol: string) => `${ROUTES.hostname}/v1/marketdata/${symbol}/pricehistory`;
