import { AccessType, GrantType, oauth, OAuthData } from '../api/authenticate';
import { AUTHENTICATION, OAUTH2_TOKEN } from './routes.config';
import { CredentialProvider } from '../providers/credentialsProvider';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { Interceptor } from './interceptor';
import client from './client';

const MAX_RETRIES = 1;

export class AuthorizationTokenInterceptor extends Interceptor {
  private authTokenRefreshRetries = MAX_RETRIES;

  constructor(private readonly credentialProvider: CredentialProvider) {
    super();
  }

  async onSuccessRequestHandler(config): Promise<any> {
    if (config.url?.includes(AUTHENTICATION) || config.url?.includes(OAUTH2_TOKEN)) return config;
    const accessToken = await this.getAccessToken();
    config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  }

  async onErrorResponseHandler(error: AxiosError): Promise<any> {
    const { config, response } = error;

    if (config.url?.includes(OAUTH2_TOKEN) || config.url?.includes(AUTHENTICATION)) return error;

    if (response?.status === 401 && this.authTokenRefreshRetries > 0) {
      this.authTokenRefreshRetries--;
      await this.refreshAccessToken();
      const secondResponse = await client.connect(config);
      this.resetAuthTokenRefreshRetries();
      return secondResponse;
    }

    return error;
  }

  private resetAuthTokenRefreshRetries() {
    this.authTokenRefreshRetries = MAX_RETRIES;
  }

  private async getAccessToken(): Promise<string> {
    const { access_token } = await this.credentialProvider.getCredential();
    return access_token;
  }

  private async refreshAccessToken() {
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
