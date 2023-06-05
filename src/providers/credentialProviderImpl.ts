import { CredentialProvider, TdaCredential } from "./credentialProvider";

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
