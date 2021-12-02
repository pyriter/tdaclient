const ROUTES = {
  hostname: 'https://api.tdameritrade.com',
  endpoints: {
    oauth2Token: '/v1/oauth2/token',
    auth: '/auth',
    accounts: '/v1/accounts',
    orders: '/v1/orders',
  },
};

export const AUTHENTICATION = `${ROUTES.hostname}${ROUTES.endpoints.oauth2Token}`;
export const ACCOUNTS = `${ROUTES.hostname}${ROUTES.endpoints.accounts}`;
export const OAUTH2_TOKEN = `${ROUTES.hostname}${ROUTES.endpoints.oauth2Token}`;
export const ORDERS = `${ROUTES.hostname}${ROUTES.endpoints.orders}`;
