# TD Ameritrade Client for Nodejs

## Overview

A Javascript thick client for the TD-Ameritrade Restful API written in Typescript for nodejs.

## Features

1. Auto fetch refresh token when access token expires.
2. Credentials can be fetched and stored using these providers
    1. Local cache
    2. Local file
    3. Customizable (e.g. connect to datastore such as S3 or DynamoDB)
3. Get user account information
4. Get watchlist
5. Get option chain
6. Get quote
7. Manage orders
8. Get transactions
9. Get market hours
10. Get price history

## Install

```bash
$ yarn add tdaclient 
```

## Getting a TD Ameritrade Access Token

To gain access to the Td-Ameritrade (TDA) APIs, you will need to get an access token from your trading account.

You can get an access token by:

1. Following this tutorial found on the official TDA
   API [documentation](https://developer.tdameritrade.com/content/getting-started).
2. Or you can follow the steps in this [section](##Guide to Getting an Access Token).

## How to use it

### Instantiate the TdaClient object

At the bare minimum, you will need to provide an access token and client id in order to instantiate the tdaClient. This
can be done in a few ways:

#### 1. Local cache

```typescript
import {TdaClient} from "tdaclient";

const tdaClient = TdaClient.from({
  access_token: "MY-ACCESS-TOKEN",
  client_id: "MY-CLIENT-ID",
  refresh_token: "MY-REFRESH-TOKEN" // Optional: Refresh token is used to renew the access_token
});
```

#### 2. Local file

The tdaClient will read the credentials from this file. Make sure that the tdaClient is able to read and write to this
file.

```typescript
import {TdaClient} from "tdaclient";

/* Example CREDENTIAL_FILE.json file
{ 
  "access_token": "MY-ACCESS-TOKEN",
  "refresh_token": "MY-REFRESH-TOKEN",
  "client_id": "MY-CLIENT-ID"
}
 */

const tdaClient = TdaClient.from({
  fileName: PATH_TO_CREDENTIAL_FILE_NAME,
});
```

#### 3. Custom credential provider

You can specify your own way of providing the credential information. Here is an example of reading and writing to a
credential file stored in S3. The basic idea here is to create a class that extends the CredentialProvider abstract
class. You need to override the `getCredential` and the `updateCredential` member functions. You then pass that provider
when you instantiate the tdaClient.

```typescript
export class S3CredentialProvider extends CredentialProvider {
  async updateCredential(tdaCredential: TdaCredential): Promise<void> {
    // do something
  }

  async getCredential(): Promise<TdaCredential> {
    // do something
  }
}

const tdaClient = TdaClient.from({
  authorizationInterceptor: new AuthorizationTokenInterceptor(new S3CredentialProvider())
});
```

### Refresh Token

If you provide a refresh token to the tdaClient, when the access token expires, the tdaClient will automatically fetch a
new access token using the existing valid refresh token. When the refresh token expires, the tdaClient will
automatically refresh the credential information.

## Interacting with TDA

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
  symbol: 'SPY',
  strike: 470,
  strikeCount: 10
} as OptionChainConfig)

console.log(optionChainResponse);
```

### Get Market Hours
```typescript
import { HoursConfig } from "tdaClient/dist/models/hours";

const response = await tdaClient.getHours({
  markets: ['EQUITY', 'OPTION']
} as HoursConfig);

console.log(response);
```

### Get Price History 
```typescript
import { PriceHistoryConfig } from "tdaClient/dist/models/priceHistory";

const response = await tdaClient.getPriceHistory({
  symbol: 'SPX',
  periodType: 'day',
  period: 1,
  needExtendedHoursData: false,
} as PriceHistoryConfig);

console.log(response);
```



## Guide to Getting an Access Token

For more info refer to this [page](https://developer.tdameritrade.com/content/getting-started)

1. Clone this github repo
2. Create a file calls `credentials.json` and put it in the package root directory.
3. Put the following information in that file you just created:
   ```json
   {
      "client_id": "example-client-id",
      "redirect_uri": "example-redirect-uri"      
   }
   ```
4. Run this command and open the output URL from the console.
    ```bash
    node generateAuthUrl.js
    ```
5. Login and click allow.
6. You will then see a blank page load. Take a look at the URL bar on your browser.
    1. You will see a URL query string with a value for `code`.
    2. Copy this value.
    3. Open up the developer's console on the browser and type this in: ```decodeURIComponent("MY_CODE")```
    4. Keep this decoded code. This is your access_token.
7. Go to this [page](https://developer.tdameritrade.com/authentication/apis/post/token-0) to get the access token and
   refresh token
    1. Fill in the form with the follow values:
        1. grant_type: authorization_code
        2. access_type: offline
        3. code: [The value that you receive from following step]
        4. client_id: [Your app consumer key]
        5. redirect_uri: [Your app redirect uri]
8. Create a file in this directory (at the same level as this README.md) and name it ```credentials.json```
9. Paste the response from that page to the file create in step 3. Also add the client_id and redirect_uri attributes at
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
10. Now you can run the command ```yarn test``` and it will run the integration tests
11. The test will keep updating the access_token so you can keep running the tests. If you happen to not run the tests
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

tdaClient is [MIT licensed](./LICENSE).
