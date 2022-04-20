import { ACCOUNTS } from '../connection/routes.config';
import { ArrayFormatType, Request, ResponseType } from '../models/connect';
import { Watchlist, WatchListConfig } from '../models/watchlist';
import { Client } from '../connection/client';

export class WatchlistApi {
  constructor(private client: Client) {}

  async getWatchList(config: WatchListConfig = {}): Promise<Watchlist[]> {
    const url = this.generateWatchListUrl({ accountId: config.accountId });
    const response = await this.client.get({
      url,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    return response.data;
  }

  generateWatchListUrl({ accountId }) {
    if (accountId) {
      return `${ACCOUNTS}/${accountId}/watchlists`;
    } else {
      return `${ACCOUNTS}/watchlists`;
    }
  }
}
