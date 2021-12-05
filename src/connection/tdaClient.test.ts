import { TdaClient } from './tdaClient';
import { AuthorizationTokenInterceptor } from './authorizationTokenInterceptor';
import { LocalFileCredentialProvider } from '../providers/localFileCredentialProvider';
import { CREDENTIALS_FILE_NAME } from '../utils/constants';

describe('TdaClient', () => {
  it('should be able to build a client', async () => {
    const provider = new LocalFileCredentialProvider(CREDENTIALS_FILE_NAME);
    const authorizationInterceptor = new AuthorizationTokenInterceptor(provider);
    const tdaClient = new TdaClient({
      authorizationInterceptor,
    });

    const response = await tdaClient.getAccount();

    expect(response);
  });
});
