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

export abstract class CredentialProvider {
  private cachedCredential?: TdaCredential;

  async fetch(): Promise<TdaCredential> {
    throw Error("You must implement a function to get the credential information and return it")
  }

  async update(tdaCredential: TdaCredential): Promise<void> {
    throw Error("You must implement a function to store the given credential")
  }

  async getCredential(): Promise<TdaCredential> {
    if (!this.cachedCredential) {
      const credential = await this.fetch();
      this.cachedCredential = {
        ...credential
      }
    }
    return this.cachedCredential;
  }

  async updateCredential(tdaCredential: TdaCredential): Promise<void> {
    this.cachedCredential = tdaCredential;
    await this.update(tdaCredential);
  }
}
