import { ArrayFormatType, Request, ResponseType } from '../models/connect';
import { PRICE_HISTORY } from '../connection/routes.config';

import { convertToValidSymbol } from '../utils/symbol';
import { Client } from '../connection/client';
import { PriceHistoryConfig, PriceHistoryResponse } from '../models/priceHistory';

export class PriceHistoryApi {
  constructor(private client: Client) {}

  async getPriceHistory(config: PriceHistoryConfig): Promise<PriceHistoryResponse> {
    const params = this.processConfig(config);
    const symbol = convertToValidSymbol(config.symbol);
    const url = PRICE_HISTORY(symbol);
    const response = await this.client.get({
      url,
      params,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);

    return response.data;
  }

  processConfig(config: PriceHistoryConfig) {
    const { periodType, period, frequencyType, frequency, endDate, startDate, needExtendedHoursData } = config;
    return {
      periodType,
      period,
      frequencyType,
      frequency,
      endDate,
      startDate,
      needExtendedHoursData,
    };
  }
}
