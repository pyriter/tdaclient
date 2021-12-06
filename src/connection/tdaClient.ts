import {Interceptor} from './interceptor';
import client from './client';
import {getAccount} from '../api/accounts';
import {CredentialProvider} from "../providers/credentialsProvider";
import {TdaClientBuilder} from "./TdaClientBuilder";

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
  authorizationInterceptor?: Interceptor;
}

export class TdaClient {
  constructor(private config: TdaClientConfig) {
    client.addInterceptor(config.authorizationInterceptor);
  }

  async getAccount(): Promise<any> {
    return await getAccount();
  }

  static from(config: TdaClientBuilderConfig): TdaClient {
    return new TdaClientBuilder(config).build();
  }
}
