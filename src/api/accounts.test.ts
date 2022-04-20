import { AccountApi } from './accounts';
import { provideClientWithLocalFileCredentialProvider } from '../utils/testUtils';

describe('Accounts', () => {
  const accountApi = new AccountApi(provideClientWithLocalFileCredentialProvider());

  it('should be able to get all accounts', async () => {
    const response = await accountApi.getAccount();
    expect(response);
  });
});
