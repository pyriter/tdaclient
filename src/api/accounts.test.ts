import { getAccount } from './accounts';
import { setupLocalFileCredentialProvider } from '../utils/testUtils';

describe('Accounts', () => {
  beforeAll(async () => {
    await setupLocalFileCredentialProvider();
  });
  it('should be able to get all accounts', async () => {
    const response = await getAccount();
    expect(response);
  });
});
