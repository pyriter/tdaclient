import {CredentialProvider, TdaCredential} from './credentialsProvider';

export class LocalCacheCredentialProvider extends CredentialProvider {
  constructor(private tdaCredential: TdaCredential) {
    super();
  }

  async updateCredential(tdaCredential: TdaCredential): Promise<void> {
    this.tdaCredential = tdaCredential;
  }

  async getCredential(): Promise<TdaCredential> {
    return this.tdaCredential;
  }
}
