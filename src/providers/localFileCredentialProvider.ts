import * as fs from 'fs';
import {CredentialProvider, TdaCredential} from './credentialsProvider';

const ENCODING = 'utf8';

export class LocalFileCredentialProvider extends CredentialProvider {
  constructor(private fileName: string) {
    super();
  }

  async updateCredential(tdaCredential: TdaCredential): Promise<void> {
    const originalCredential = await this.getCredential();
    const credentials = {
      ...originalCredential,
      ...tdaCredential
    };
    fs.writeFileSync(this.fileName, JSON.stringify(credentials, null, 2), ENCODING);
  }

  async getCredential(): Promise<TdaCredential> {
    const credential = JSON.parse(fs.readFileSync(this.fileName, ENCODING));
    if (!credential) {
      throw new Error(
        'You need to create the test credential file if you want to run the tests. Check out the README.md file',
      );
    }
    return credential;
  }
}
