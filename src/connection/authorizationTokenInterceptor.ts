import { AccessType, GrantType, oauth, OAuthData } from '../api/authenticate';
import { AUTHENTICATION, OAUTH2_TOKEN } from './routes.config';
import { CredentialProvider } from '../providers/credentialsProvider';
import { AxiosError } from 'axios';
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

    throw error;
  }

  private resetAuthTokenRefreshRetries() {
    this.authTokenRefreshRetries = MAX_RETRIES;
  }

  private async getAccessToken(): Promise<string> {
    const { access_token } = await this.credentialProvider.getCredential();
    return access_token;
  }

  private async getAccessType(): Promise<AccessType> {
    const { refresh_token_modified_date, refresh_token_expires_in } = await this.credentialProvider.getCredential();
    const expiredDate = refresh_token_modified_date + refresh_token_expires_in * 1000 * 0.9;
    const now = Date.now();
    if (!expiredDate || now >= expiredDate) return AccessType.OFFLINE;
    else return AccessType.NONE;
  }

  private async refreshAccessToken() {
    const { client_id, redirect_uri, refresh_token } = await this.credentialProvider.getCredential();
    const accessType = await this.getAccessType();
    const credential = await oauth({
      client_id,
      redirect_uri,
      refresh_token,
      grant_type: GrantType.REFRESH_TOKEN,
      access_type: accessType,
    } as OAuthData);

    const now = Date.now();
    // need to resolve the modified information here
    switch (accessType) {
      case AccessType.OFFLINE:
        await this.credentialProvider.updateCredential({
          ...credential,
          access_token_modified_date: now,
          refresh_token_modified_date: now,
        });
        break;
      case AccessType.NONE:
        await this.credentialProvider.updateCredential({
          ...credential,
          access_token_modified_date: now,
        });
        break;
    }
  }
}
