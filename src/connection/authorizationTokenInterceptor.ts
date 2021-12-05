import { AccessType, GrantType, oauth, OAuthData } from '../api/authenticate';
import { AUTHENTICATION } from './routes.config';
import { CredentialProvider } from '../providers/credentialsProvider';
import { AxiosRequestConfig } from 'axios';
import { Interceptor } from './interceptor';

export class AuthorizationTokenInterceptor extends Interceptor {
  constructor(private readonly credentialProvider: CredentialProvider) {
    super();
  }

  async onSuccessRequestHandler(config): Promise<AxiosRequestConfig> {
    if (config.url.includes(AUTHENTICATION)) return config;
    const accessToken = await this.getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  private async getAccessToken(): Promise<string> {
    await this.checkAndRefreshAccessToken();
    const { access_token } = await this.credentialProvider.getCredential();
    return access_token;
  }

  private async checkAndRefreshAccessToken() {
    const { client_id, redirect_uri, refresh_token } = await this.credentialProvider.getCredential();
    const credentials = await oauth({
      client_id,
      redirect_uri,
      refresh_token,
      grant_type: GrantType.REFRESH_TOKEN,
      access_type: AccessType.OFFLINE,
    } as OAuthData);
    await this.credentialProvider.updateCredential(credentials);
  }
}
