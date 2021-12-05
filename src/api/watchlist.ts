import { ACCOUNTS } from '../connection/routes.config';
import { ArrayFormatType, Request, ResponseType } from '../models/connect';
import { Watchlist, WatchListConfig } from '../models/watchlist';
import client from '../connection/client';

export async function getWatchList(config: WatchListConfig = {}): Promise<Watchlist[]> {
  const url = generateWatchListUrl({ accountId: config.accountId });
  const response = await client.get({
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
