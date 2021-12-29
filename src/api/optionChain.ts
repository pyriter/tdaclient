import {ArrayFormatType, Request, ResponseType} from '../models/connect';
import {OPTION_CHAIN} from '../connection/routes.config';

import client from '../connection/client';
import {OptionChainConfig, OptionChainResponse} from "../models/optionChain";

/*
All orders for a specific account or, if account ID isn't specified, orders will be returned for all linked accounts.
 */
export async function getOptionChain(config?: OptionChainConfig): Promise<OptionChainResponse> {
  const url = OPTION_CHAIN;
  const response = await client.get({
    url,
    params: config,
    responseType: ResponseType.JSON,
    arrayFormat: ArrayFormatType.COMMA,
  } as Request);
  return processResponse(response.data);
}

function processResponse(response: OptionChainResponse): OptionChainResponse {
  if(response.status == "FAILED") {
    throw new Error("Unable to get option chain. This is usually caused by an incorrect OptionChainConfig property");
  } else {
    return response;
  }
}
