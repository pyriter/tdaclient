import { ArrayFormatType, Request, ResponseType } from '../models/connect';
import { AccountConfig, SecuritiesAccount } from '../models/accounts';
import { ACCOUNTS } from '../connection/routes.config';
import { Client } from '../connection/client';

export class AccountApi {
  constructor(private client: Client) {}

  async getAccount(config: AccountConfig = {}): Promise<SecuritiesAccount[]> {
    const url = this.generateAccountUrl({ accountId: config.accountId });
    const response = await this.client.get({
      url,
      params: {
        fields: config.fields,
      },
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    return response.data.map((d) => d.securitiesAccount) as SecuritiesAccount[];
  }

  generateAccountUrl({ accountId }) {
    const accountUIdUrlString = accountId ? '/' + accountId : '';
    return `${ACCOUNTS}${accountUIdUrlString}`;
  }
}
