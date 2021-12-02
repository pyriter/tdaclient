import { ArrayFormatType, get, Request, ResponseType } from '../connection/connect';
import { AccountConfig, SecuritiesAccount } from '../models/accounts';
import { ACCOUNTS } from '../connection/routes.config';

export async function getAccount(config: AccountConfig = {}): Promise<SecuritiesAccount[]> {
  const url = generateAccountUrl({ accountId: config.accountId });
  const response = await get({
    url,
    params: {
      fields: config.fields,
    },
    responseType: ResponseType.JSON,
    arrayFormat: ArrayFormatType.COMMA,
  } as Request);
  return response.data.map((d) => d.securitiesAccount) as SecuritiesAccount[];
}

function generateAccountUrl({ accountId }) {
  const accountUIdUrlString = accountId ? '/' + accountId : '';
  return `${ACCOUNTS}${accountUIdUrlString}`;
}
