import {TdaClient} from './tdaClient';
import {AuthorizationTokenInterceptor} from './authorizationTokenInterceptor';
import {LocalFileCredentialProvider} from '../providers/localFileCredentialProvider';
import {CREDENTIALS_FILE_NAME} from '../utils/constants';

describe('TdaClient', () => {
  let tdaClient;
  beforeAll(async () => {
    tdaClient = await setupTdaClient();
  });
  it('should be able to build a tdaClient from interceptor', async () => {
    const localFileCredentialProvider = new LocalFileCredentialProvider(CREDENTIALS_FILE_NAME);
    const authorizationInterceptor = new AuthorizationTokenInterceptor(localFileCredentialProvider);
    const tdaClient = new TdaClient({
      authorizationInterceptor,
    });

    const response = await tdaClient.getAccount();

    expect(response);
  });

  it('should be able to create tdaClient from filename and work as expected', async () => {
    const tdaClient = TdaClient.from({
      fileName: CREDENTIALS_FILE_NAME,
    });

    const response = await tdaClient.getAccount();

    expect(response);
  });

  it('should be able to create tdaclient from access token and work as expected', async () => {
    const localFileCredentialProvider = new LocalFileCredentialProvider(CREDENTIALS_FILE_NAME);
    const {access_token, client_id, refresh_token} = await localFileCredentialProvider.getCredential();
    const tdaClient = TdaClient.from({
      access_token,
      client_id,
      refresh_token,
    });

    const response = await tdaClient.getAccount();

    expect(response);
  });

  // Excluding this test because it creates a new refresh token everytime it runs
  xit('given an invalid access token, it should use a valid refresh token to get a new access token', async () => {
    const localFileCredentialProvider = new LocalFileCredentialProvider(CREDENTIALS_FILE_NAME);
    const {client_id, refresh_token} = await localFileCredentialProvider.getCredential();
    const tdaClient = TdaClient.from({
      access_token: 'INVALID_ACCESS_TOKEN',
      client_id,
      refresh_token,
    });

    const response = await tdaClient.getAccount();

    expect(response);
  });
});

async function setupTdaClient(): Promise<TdaClient> {
  const localFileCredentialProvider = new LocalFileCredentialProvider(CREDENTIALS_FILE_NAME);
  const {access_token, client_id, refresh_token} = await localFileCredentialProvider.getCredential();
  return TdaClient.from({
    access_token,
    client_id,
    refresh_token,
  });
}
