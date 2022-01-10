import { ArrayFormatType, Request, ResponseType } from '../models/connect';
import { QUOTES } from '../connection/routes.config';

import client from '../connection/client';
import { QuotesConfig, QuotesEtf, QuotesIndex } from '../models/quotes';
import { convertToValidSymbol, convertToValidSymbols } from '../utils/symbol';

/*
All orders for a specific account or, if account ID isn't specified, orders will be returned for all linked accounts.
 */
export async function getQuotes(config?: QuotesConfig): Promise<(QuotesIndex | QuotesEtf)[]> {
  const params = processConfig(config);
  const url = QUOTES;
  const response = await client.get({
    url,
    params,
    responseType: ResponseType.JSON,
    arrayFormat: ArrayFormatType.COMMA,
  } as Request);
  return processResponse(response.data);
}

function processConfig(config?: QuotesConfig) {
  if (!config) return;
  const { symbols } = config;
  return {
    symbol: convertToValidSymbols(symbols).join(','),
  };
}

function processResponse(data: any): (QuotesIndex | QuotesEtf)[] {
  return Object.values(data);
}
