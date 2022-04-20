import { ArrayFormatType, Request, ResponseType } from '../models/connect';
import { OPTION_CHAIN } from '../connection/routes.config';

import { OptionChainConfig, OptionChainResponse } from '../models/optionChain';
import { convertToValidSymbol } from '../utils/symbol';
import { round } from '../utils/round';
import { Client } from '../connection/client';

export class OptionChainApi {
  constructor(private client: Client) {}

  /*
 All orders for a specific account or, if account ID isn't specified, orders will be returned for all linked accounts.
  */
  async getOptionChain(config?: OptionChainConfig): Promise<OptionChainResponse> {
    this.processConfig(config);
    const url = OPTION_CHAIN;
    const response = await this.client.get({
      url,
      params: config,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    return this.processResponse(response.data);
  }

  processConfig(config?: OptionChainConfig) {
    if (!config) return;
    const { symbol } = config;
    config.symbol = convertToValidSymbol(symbol);
    if (config.interval) {
      // @ts-ignore
      config.strike = round(config.strike, config.interval);
    }
  }

  processResponse(response: OptionChainResponse): OptionChainResponse {
    if (response.status === 'FAILED') {
      throw new Error('Unable to get option chain. This is usually caused by an incorrect OptionChainConfig property');
    } else {
      return response;
    }
  }
}
