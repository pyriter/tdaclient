import { getWatchList } from './watchlist';
import { setupLocalFileCredentialProvider } from '../utils/testUtils';

describe('WatchLists', () => {
  beforeAll(async () => {
    await setupLocalFileCredentialProvider();
  });

  it('should be able to get all watchlist for an account', async () => {
    const response = await getWatchList();
    expect(response);
  });
});
