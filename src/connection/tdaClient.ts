import { Interceptor } from './interceptor';
import client from './client';
import { getAccount } from '../api/accounts';
import { CredentialProvider } from '../providers/credentialsProvider';
import { TdaClientBuilder } from './tdaClientBuilder';
import { cancelOrder, getOrder, getOrdersByQuery, placeOrder } from '../api/orders';
import {
  CancelOrderConfig,
  GetOrderConfig,
  OrderGet,
  OrdersByQueryConfig,
  OrdersConfig,
  PlaceOrdersResponse,
} from '../models/order';
import { AuthorizationTokenInterceptor } from './authorizationTokenInterceptor';
import { OptionChainConfig, OptionChainResponse } from '../models/optionChain';
import { getOptionChain } from '../api/optionChain';
import { QuotesConfig, QuotesEtf, QuotesIndex } from '../models/quotes';
import { getQuotes } from '../api/quotes';
import { SecuritiesAccount } from '../models/accounts';
import { getTransactions, getTransactionsByQuery } from '../api/transactions';
import { GetTransactionsByQueryConfig, GetTransactionsConfig, Transaction } from '../models/transaction';

export interface TdaClientConfig {
  authorizationInterceptor: Interceptor;
}

export interface TdaClientBuilderConfig {
  access_token?: string;
  refresh_token?: string;
  client_id?: string;
  redirect_uri?: string;
  fileName?: string;
  credentialProvider?: CredentialProvider;
  authorizationInterceptor?: AuthorizationTokenInterceptor;
}

export class TdaClient {
  constructor(private config: TdaClientConfig) {
    client.addInterceptor(config.authorizationInterceptor);
  }

  static from(config: TdaClientBuilderConfig): TdaClient {
    return new TdaClientBuilder(config).build();
  }

  async getAccount(): Promise<SecuritiesAccount[]> {
    return await getAccount();
  }

  async placeOrder(config: OrdersConfig): Promise<PlaceOrdersResponse> {
    return await placeOrder(config);
  }

  async getOptionChain(config: OptionChainConfig): Promise<OptionChainResponse> {
    return await getOptionChain(config);
  }

  async getQuotes(config: QuotesConfig): Promise<(QuotesIndex | QuotesEtf)[]> {
    return await getQuotes(config);
  }

  async cancelOrder(config: CancelOrderConfig): Promise<any> {
    return await cancelOrder(config);
  }

  async getOrdersByQuery(config: OrdersByQueryConfig): Promise<OrderGet[]> {
    return await getOrdersByQuery(config);
  }

  async getOrder(config: GetOrderConfig): Promise<OrderGet> {
    return await getOrder(config);
  }

  async getTransactionsByQuery(config: GetTransactionsByQueryConfig): Promise<Transaction[]> {
    return await getTransactionsByQuery(config);
  }

  async getTransactions(config: GetTransactionsConfig): Promise<Transaction[]> {
    return await getTransactions(config);
  }
}
