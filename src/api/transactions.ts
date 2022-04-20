import {ArrayFormatType, Request, ResponseType} from '../models/connect';
import {ACCOUNTS} from '../connection/routes.config';
import {GetTransactionsByQueryConfig, GetTransactionsConfig, Transaction} from '../models/transaction';
import {Client} from "../connection/client";

interface TransactionUrl {
  accountId: string;
  transactionId?: string;
}

export class TransactionsApi {
  constructor(private client: Client) {
  }

  async getTransactions(config: GetTransactionsConfig): Promise<Transaction[]> {
    const url = this.generateTransactionsUrl({accountId: config.accountId, transactionId: config.transactionId});
    const response = await this.client.get({
      url,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    return response.data as Transaction[];
  }

  async getTransactionsByQuery(config: GetTransactionsByQueryConfig): Promise<Transaction[]> {
    const url = this.generateTransactionsUrl({accountId: config.accountId});
    // @ts-ignore
    delete config.accountId;
    const response = await this.client.get({
      url,
      params: config,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
    } as Request);
    return response.data;
  }

  generateTransactionsUrl(config: TransactionUrl) {
    const {accountId, transactionId} = config;
    const transactionIdUrlString = transactionId ? '/' + transactionId : '';
    return `${ACCOUNTS}/${accountId}/transactions${transactionIdUrlString}`;
  }

}
