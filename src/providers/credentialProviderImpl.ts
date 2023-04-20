import { CredentialProvider } from './credentialProvider';

export interface TdaCredential {
  access_token: string;
  refresh_token: string;
  scope?: string;
  expires_in: number;
  refresh_token_expires_in: number;
  token_type?: string;
  access_token_modified_date: number;
  refresh_token_modified_date: number;
  client_id: string;
  redirect_uri?: string;
}

export abstract class CredentialProviderImpl implements CredentialProvider {
  async fetch(): Promise<TdaCredential> {
    throw Error('You must implement a function to get the credential information and return it');
  }

  async update(tdaCredential: TdaCredential): Promise<void> {
    throw Error('You must implement a function to store the given credential');
  }

  async updateCredential(tdaCredential: TdaCredential): Promise<void> {
    const originalCredential = await this.getCredential();
    const credential = {
      ...originalCredential,
      ...tdaCredential,
      modified_date: Date.now(),
    };
    await this.update(credential);
  }

  async getCredential(): Promise<TdaCredential> {
    return await this.fetch();
  }
}
