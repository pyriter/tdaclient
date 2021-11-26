import {get, Request, ResponseType} from "../connection/connect";
import routes from "../connection/routes.config";
import {AccountConfig, SecuritiesAccount} from "../models/accounts";

const ACCOUNTS = `${routes.hostname}${routes.endpoints.accounts}`;

export async function getAccount(config: AccountConfig = {}): Promise<SecuritiesAccount[]> {
  const url = generateAccountUrl({accountId: config.accountId});
  const response = await get({
    url,
    params: {
      fields: config.fields
    },
    responseType: ResponseType.JSON
  } as Request);
  return response.data.map(d => d.securitiesAccount) as SecuritiesAccount[];
}

function generateAccountUrl({accountId}) {
  const accountUIdUrlString = accountId ? "/" + accountId : "";
  return `${ACCOUNTS}${accountUIdUrlString}`;
}
