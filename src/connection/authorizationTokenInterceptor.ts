import { AccessType, GrantType, oauth, OAuthData } from '../api/authenticate';
import { AUTHENTICATION, OAUTH2_TOKEN } from './routes.config';
import { CredentialProvider, TdaCredential } from '../providers/credentialProvider';
import { AxiosError } from 'axios';
import { Interceptor } from './interceptor';
import { Client } from './client';

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

  async onErrorResponseHandler(error: AxiosError, client: Client): Promise<any> {
    const { config, response } = error;

    if (config.url?.includes(OAUTH2_TOKEN) || config.url?.includes(AUTHENTICATION)) return error;

    if (response?.status === 401 && this.authTokenRefreshRetries > 0) {
      console.error(`Response is 401: ${JSON.stringify(error)}`);
      this.authTokenRefreshRetries--;
      await this.refreshAccessToken(client);
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
    const { access_token } = await this.getCredential();
    return access_token;
  }

  private getAccessType(tdaCredential: TdaCredential): AccessType {
    const { refresh_token_modified_date, refresh_token_expires_in } = tdaCredential;
    const expiredDate = refresh_token_modified_date + refresh_token_expires_in * 1000 * 0.9;
    const now = Date.now();
    if (!expiredDate || now >= expiredDate) return AccessType.OFFLINE;
    else return AccessType.NONE;
  }

  private async generateOAuthData(): Promise<OAuthData> {
    const tdaCredential = await this.getCredential();
    const { client_id, redirect_uri, refresh_token } = tdaCredential;
    const accessType = this.getAccessType(tdaCredential);
    return {
      client_id,
      redirect_uri,
      refresh_token,
      grant_type: GrantType.REFRESH_TOKEN,
      access_type: accessType,
    };
  }

  private async refreshAccessToken(client: Client) {
    const oAuthData = await this.generateOAuthData();
    const credential = await oauth(oAuthData, client);

    const now = Date.now();
    // need to resolve the modified information here
    switch (oAuthData.access_type) {
      case AccessType.OFFLINE:
        // @ts-ignore
        await this.updateCredential({
          ...credential,
          access_token_modified_date: now,
          refresh_token_modified_date: now,
        });
        break;
      case AccessType.NONE:
        // @ts-ignore
        await this.updateCredential({
          ...credential,
          access_token_modified_date: now,
        });
        break;
    }
  }

  private async getCredential(): Promise<TdaCredential> {
    return await this.credentialProvider.getCredential.bind(this.credentialProvider)();
  }

  private async updateCredential(tdaCredential: TdaCredential): Promise<void> {
    await this.credentialProvider.updateCredential.bind(this.credentialProvider, tdaCredential)();
  }
}
