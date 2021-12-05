import { LocalFileCredentialProvider } from './localFileCredentialProvider';
import { CREDENTIALS_FILE_NAME } from '../utils/constants';

describe('CredentialsProvider', () => {
  const provider = new LocalFileCredentialProvider(CREDENTIALS_FILE_NAME);

  it('should read from the test-configuration.json file', async () => {
    const credentials = await provider.getCredential();

    expect(credentials.access_token);
    expect(credentials.refresh_token);
  });

  it('should update the credentials', async () => {
    const credential = await provider.getCredential(); // We don't want to modified the credentials so getting them from LIVE

    await provider.updateCredential(credential);
    const actualCredentials = await provider.getCredential();

    expect(actualCredentials.access_token).toEqual(credential.access_token);
    expect(actualCredentials.refresh_token).toEqual(credential.refresh_token);
    expect(actualCredentials.modified_date).toBeLessThan(Date.now());
    expect(actualCredentials.modified_date).not.toEqual(credential.modified_date);
  });
});
