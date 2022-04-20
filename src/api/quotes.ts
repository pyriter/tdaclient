import {ArrayFormatType, Request, ResponseType} from '../models/connect';
import {QUOTES} from '../connection/routes.config';

import {QuotesConfig, QuotesEtf, QuotesIndex} from '../models/quotes';
import {convertToValidSymbols} from '../utils/symbol';
import {Client} from "../connection/client";

export class QuotesApi {
  constructor(private client: Client) {
  }

  /*
 All orders for a specific account or, if account ID isn't specified, orders will be returned for all linked accounts.
  */
  async getQuotes(config?: QuotesConfig): Promise<(QuotesIndex | QuotesEtf)[]> {
    const params = this.processConfig(config);
    const url = QUOTES;
    const response = await this.client.get({
      url,
      params,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    return this.processResponse(response.data);
  }

  processConfig(config?: QuotesConfig) {
    if (!config) return;
    const { symbols } = config;
    return {
      symbol: convertToValidSymbols(symbols).join(','),
    };
  }

  processResponse(data: any): (QuotesIndex | QuotesEtf)[] {
    return Object.values(data);
  }

}
