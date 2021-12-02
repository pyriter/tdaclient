import { ACCOUNTS } from '../connection/routes.config';
import { ArrayFormatType, get, Request, ResponseType } from '../connection/connect';
import { Watchlist, WatchListConfig } from '../models/watchlist';

export async function getWatchList(config: WatchListConfig = {}): Promise<Watchlist[]> {
  const url = generateWatchListUrl({ accountId: config.accountId });
  const response = await get({
    url,
    responseType: ResponseType.JSON,
    arrayFormat: ArrayFormatType.COMMA,
  } as Request);
  return response.data;
}

function generateWatchListUrl({ accountId }) {
  if (accountId) {
    return `${ACCOUNTS}/${accountId}/watchlists`;
  } else {
    return `${ACCOUNTS}/watchlists`;
  }
}
