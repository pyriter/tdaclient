import { LocalFileCredentialProvider } from './localFileCredentialProvider';
import { CREDENTIALS_FILE_NAME } from '../utils/constants';

describe('CredentialsProvider', () => {
  const provider = new LocalFileCredentialProvider(CREDENTIALS_FILE_NAME);

  it('should read from the test-configuration.json file', async () => {
    const credentials = await provider.getCredential();

    expect(credentials.access_token);
    expect(credentials.refresh_token);
  });

  xit('should update the credentials', async () => {
    const previousCredential = await provider.getCredential(); // We don't want to modified the credentials so getting them from LIVE
    const expectedCredential = {
      ...previousCredential,
      access_token: 'test-access-token',
    };
    await provider.updateCredential(expectedCredential);

    const actualCredentials = await provider.getCredential();

    expect(actualCredentials.access_token).toEqual(expectedCredential.access_token);
    expect(actualCredentials.refresh_token).toEqual(expectedCredential.refresh_token);
    expect(actualCredentials.refresh_token_expires_in).toEqual(expectedCredential.refresh_token_expires_in);
    expect(actualCredentials.access_token_modified_date).toEqual(expectedCredential.access_token_modified_date);
  });
});
