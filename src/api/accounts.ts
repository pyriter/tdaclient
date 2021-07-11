import {get, Request, ResponseType} from "../connection/connect";
import routes from "../connection/routes.config";

const ACCOUNTS = `${routes.hostname}${routes.endpoints.accounts}`;

export class AccountConfig {
  constructor(public accountId?: string, public fields?: any) {
  }

  get accountIdUrlString(): string {
    return this.accountId ? "/" + this.accountId : "";
  }
}

export async function getAccount(config: AccountConfig) {
  const url = `${ACCOUNTS}${config.accountIdUrlString}`;
  const response = await get({
    url,
    params: {
      fields: config.fields
    },
    responseType: ResponseType.JSON
  } as Request);
  return response.data;
}
