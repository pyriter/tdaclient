import {get, Request, ResponseType} from "../connection/connect";
import routes from "../connection/routes.config";
import {AccountConfig, SecuritiesAccount} from "../models/accounts";

const ACCOUNTS = `${routes.hostname}${routes.endpoints.accounts}`;

export async function getAccount(config: AccountConfig): Promise<SecuritiesAccount[]> {
  const url = `${ACCOUNTS}${config.accountIdUrlString}`;
  const response = await get({
    url,
    params: {
      fields: config.fields
    },
    responseType: ResponseType.JSON
  } as Request);
  return response.data as SecuritiesAccount[];
}
