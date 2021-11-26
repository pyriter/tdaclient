import routes from "../connection/routes.config";
import {get, Request, ResponseType} from "../connection/connect";
import {Watchlist, WatchListConfig} from "../models/watchlist";

const ACCOUNTS = `${routes.hostname}${routes.endpoints.accounts}`;

function generateWatchListUrl({accountId}) {
  if (accountId) {
    return `${ACCOUNTS}/${accountId}/watchlists`;
  } else {
    return `${ACCOUNTS}/watchlists`;
  }
}

export async function getWatchList(config: WatchListConfig = {}) {
  const url = generateWatchListUrl({accountId: config.accountId});
  const response = await get({
    url,
    responseType: ResponseType.JSON
  } as Request);
  return response.data as Watchlist[];
}
