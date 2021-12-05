import { AccessType, GrantType, oauth, OAuthData } from './authenticate';
import { LocalFileCredentialProvider } from '../providers/localFileCredentialProvider';
import { CREDENTIALS_FILE_NAME } from '../utils/constants';

describe('Authenticate', () => {
  it('should be able to get an new access token and refresh token', async () => {
    const credential = new LocalFileCredentialProvider(CREDENTIALS_FILE_NAME);
    const { client_id, redirect_uri, refresh_token } = await credential.getCredential();

    const response = await oauth({
      client_id,
      redirect_uri,
      refresh_token,
      grant_type: GrantType.REFRESH_TOKEN,
      access_type: AccessType.OFFLINE,
    } as OAuthData);

    expect(response.access_token);
    expect(response.refresh_token);
  });
});
