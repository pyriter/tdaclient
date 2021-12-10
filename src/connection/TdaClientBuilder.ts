import { AuthorizationTokenInterceptor } from './authorizationTokenInterceptor';
import { LocalFileCredentialProvider } from '../providers/localFileCredentialProvider';
import { LocalCacheCredentialProvider } from '../providers/localCacheCrendentialProvider';
import { TdaCredential } from '../providers/credentialsProvider';
import { TdaClient, TdaClientBuilderConfig } from './tdaClient';

export class TdaClientBuilder {
  constructor(private config: TdaClientBuilderConfig) {}

  build(): TdaClient {
    const authorizationInterceptor = this.getAuthorizationInterceptor();
    return new TdaClient({
      authorizationInterceptor,
    });
  }

  private getAuthorizationInterceptor(): AuthorizationTokenInterceptor {
    if (this.config.authorizationInterceptor) return this.config.authorizationInterceptor;
    let provider;
    if (this.config.fileName) {
      provider = new LocalFileCredentialProvider(this.config.fileName);
    } else {
      const { access_token, refresh_token, client_id, redirect_uri } = this.config;
      provider = new LocalCacheCredentialProvider({
        access_token,
        refresh_token,
        client_id,
        redirect_uri,
      } as TdaCredential);
    }
    return new AuthorizationTokenInterceptor(provider);
  }
}
