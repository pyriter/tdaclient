# TD Ameritrade Client for Nodejs

## Overview

A client that knows how to call the TD-Ameritrade Restful API written for nodejs. The library is written in Typescript.
This means you can use your favorite IDE to do code complete. This allows you to focus on writing your trading strategy
instead of looking at the TDA documentation.

## Features

1. Auto fetch refresh token when access token expires and updates credentials.
2. Credentials can be fetched and stored using these providers
    1. Local cache
    2. Local file
    3. Customizable (e.g. connect to datastore such as S3 or DynamoDB)
3. Get user account information
4. Execute trades
5. Get watchlist
6. Get option chain.

## Install

```bash
$ yarn add tdaclient 
```

## Getting a TD Ameritrade Access Token

To gain access to the TDA APIs, you will need to get an access token. You cannot simply use your username and password
to call the APIs. What you'll need to do is use your login to get an access token.

You can get an access token by following this tutorial found on the official TDA
API [documentation](https://developer.tdameritrade.com/content/getting-started).

## How to use it

### Instantiate TdaClient object

```typescript
import {TdaClient} from "tdaclient";

const tdaClient = TdaClient.from({
  access_token: "MY-ACCESS-TOKEN",
  client_id: "MY-CLIENT-ID",
  refresh_token: "MY-REFRESH-TOKEN" // Optional: Refresh token is used to renew the access_token
});

const accounts = await tdaClient.getAccount();

console.log(accounts[0]);

```

### Place An Order

```typescript
import {
  AssetType,
  DurationType,
  InstructionType, Order, OrdersConfig,
  OrderStrategyType,
  OrderType,
  SessionType
} from "tdaclient/dist/models/order";

// ...

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
        symbol: 'SPY',
        assetType: AssetType.EQUITY,
      },
    },
  ],
} as Order;
const orderConfig = {
  accountId,
  order,
} as OrdersConfig;

const placeOrdersResponse = await tdaClient.placeOrder(orderConfig);
const orderId = placeOrdersResponse.orderId;
console.log(orderId);
```

### Get Option Chain

```typescript
import {getOptionChain} from "tdaclient/dist/optionChain";
import {
  ContractType,
  OptionChainConfig,
  OptionStrategyType
} from "tdaClient/dist/models/optionChain";

const optionChainResponse = await tdaClient.getOptionChain({
  symbol,
  strike: 470,
  strikeCount: 10
} as OptionChainConfig)
console.log(optionChainResponse);
```

## Setup if you want to contribute to this package

For more info refer to this [page](https://developer.tdameritrade.com/content/getting-started)

1. Create a file calls `credentials.json` and put it in the package root directory.
2. Put the following information in that file you just created:
   ```json
   {
      "client_id": "example-client-id",
      "redirect_uri": "example-redirect-uri"      
   }
   ```
3. Run this command and open the output URL from the console.
    ```bash
    node generateAuthUrl.js
    ```
4. Login and click allow.
5. You will then see a blank page load. Take a look at the URL bar on your browser.
    1. You will see a URL query string with a value for `code`.
    2. Copy this value.
    3. Open up the developer's console on the browser and type this in: ```decodeURIComponent("MY_CODE")```
    4. Keep this decoded code. This is your access_token.
6. Go to this [page](https://developer.tdameritrade.com/authentication/apis/post/token-0) to get the access token and
   refresh token
    1. Fill in the form with the follow values:
        1. grant_type: authorization_code
        2. access_type: offline
        3. code: [The value that you receive from following step]
        4. client_id: [Your app consumer key]
        5. redirect_uri: [Your app redirect uri]
7. Create a file in this directory (at the same level as this README.md) and name it ```credentials.json```
8. Paste the response from that page to the file create in step 3. Also add the client_id and redirect_uri attributes at
   the end.
    ```json
    {
        "access_token": "example-token",
        "refresh_token": "example-refresh-token",
        "scope": "PlaceTrades AccountAccess MoveMoney",
        "expires_in": 1800, // 30 minutes
        "refresh_token_expires_in": 7776000, // 90 days
        "token_type": "Bearer",
        "client_id": "example-client-id",
        "redirect_uri": "example-redirect-uri"
    }
    ```
9. Now you can run the command ```yarn test``` and it will run the integration tests
10. The test will keep updating the access_token so you can keep running the tests. If you happen to not run the tests
    within 90 days, then you will have to manually login and repeat these steps.

### Publishing to npm

This command will update the package version and then publish to the public npm repo

```bash
$ npm version [patch | minor major]
$ npm publish
```

## Appendix

Refer to this [page](https://developer.tdameritrade.com/account-access/apis) for more info on TDA's APIs

## License

tdaclient is [MIT licensed](./LICENSE).
