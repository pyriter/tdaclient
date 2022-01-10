import {Interceptor} from './interceptor';
import client from './client';
import {getAccount} from '../api/accounts';
import {CredentialProvider} from '../providers/credentialsProvider';
import {TdaClientBuilder} from './tdaClientBuilder';
import {placeOrder} from '../api/orders';
import {OrdersConfig, PlaceOrdersResponse} from '../models/order';
import {AuthorizationTokenInterceptor} from './authorizationTokenInterceptor';
import {OptionChainConfig, OptionChainResponse} from '../models/optionChain';
import {getOptionChain} from '../api/optionChain';
import {QuotesConfig, QuotesEtf, QuotesIndex} from "../models/quotes";
import {getQuotes} from "../api/quotes";

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

  async getAccount(): Promise<any> {
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
}
