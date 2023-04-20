import { CredentialProvider, TdaCredential } from './credentialProvider';

export class LocalCacheCredentialProvider implements CredentialProvider {
  constructor(private tdaCredential: TdaCredential) {}

  async updateCredential(tdaCredential: TdaCredential): Promise<void> {
    this.tdaCredential = tdaCredential;
  }

  update(tdaCredential: TdaCredential): Promise<void> {
    throw new Error('Not implemented');
  }

  async getCredential(): Promise<TdaCredential> {
    return this.tdaCredential;
  }

  fetch(): Promise<TdaCredential> {
    throw new Error('Not implemented');
  }
}
