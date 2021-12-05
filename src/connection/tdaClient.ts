import {Interceptor} from "./interceptor";
import client from "./client";
import {getAccount} from '../api/accounts';

export interface TdaClientConfig {
  authorizationInterceptor: Interceptor
}

export class TdaClient {
  constructor(private config: TdaClientConfig) {
    client.addInterceptor(config.authorizationInterceptor)
  }

  async getAccount(): Promise<any> {
    return await getAccount();
  }
}
