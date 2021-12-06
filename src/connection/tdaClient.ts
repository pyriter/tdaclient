import {Interceptor} from './interceptor';
import client from './client';
import {getAccount} from '../api/accounts';
import {CredentialProvider, TdaCredential} from "../providers/credentialsProvider";
import {AuthorizationTokenInterceptor} from "./authorizationTokenInterceptor";
import {LocalFileCredentialProvider} from "../providers/localFileCredentialProvider";
import {LocalCacheCredentialProvider} from "../providers/localCacheCrendentialProvider";

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

export class TdaClientBuilder {
  constructor(private config: TdaClientBuilderConfig) {
  }

  build(): TdaClient {
    const authorizationInterceptor = this.getAuthorizationInterceptor();
    return new TdaClient({
      authorizationInterceptor
    });
  }

  private getAuthorizationInterceptor(): AuthorizationTokenInterceptor {
    let provider;
    if (this.config.fileName) {
      provider = new LocalFileCredentialProvider(this.config.fileName);
    } else {
      const {access_token, refresh_token, client_id, redirect_uri} = this.config;
      provider = new LocalCacheCredentialProvider({
        access_token,
        refresh_token,
        client_id,
        redirect_uri
      } as TdaCredential);
    }
    return new AuthorizationTokenInterceptor(provider);
  }

}
