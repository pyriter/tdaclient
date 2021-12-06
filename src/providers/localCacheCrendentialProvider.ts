import { CredentialProvider, TdaCredential } from './credentialsProvider';

export class LocalCacheCredentialProvider implements CredentialProvider {
  constructor(private tdaCredential: TdaCredential) {}

  async updateCredential(tdaCredential: TdaCredential): Promise<void> {
    this.tdaCredential = tdaCredential;
  }

  async getCredential(): Promise<TdaCredential> {
    return this.tdaCredential;
  }
}
