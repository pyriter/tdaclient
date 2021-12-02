import { getCredentials, updateCredentials } from './credentialsProvider';

describe('CredentialsProvider', () => {
  it('should read from the test-configuration.json file', () => {
    const credentials = getCredentials();
    expect(credentials.access_token);
    expect(credentials.refresh_token);
  });

  it('should update the credentials', () => {
    const credentials = getCredentials(); // We don't want to modified the credentials so getting them from LIVE

    updateCredentials(credentials);
    const actualCredentials = getCredentials();

    expect(actualCredentials.access_token).toEqual(credentials.access_token);
    expect(actualCredentials.refresh_token).toEqual(credentials.refresh_token);
    expect(actualCredentials.modified_date).toBeLessThan(Date.now());
  });
});
