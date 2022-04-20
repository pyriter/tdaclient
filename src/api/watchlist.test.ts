import {AccountApi} from "./accounts";
import {provideClientWithLocalFileCredentialProvider} from "../utils/testUtils";
import {WatchlistApi} from "./watchlist";

describe('WatchLists', () => {
  const watchlistApi = new WatchlistApi(provideClientWithLocalFileCredentialProvider())

  it('should be able to get all watchlist for an account', async () => {
    const response = await watchlistApi.getWatchList();
    expect(response);
  });
});
