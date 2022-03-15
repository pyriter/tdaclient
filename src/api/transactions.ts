import { ArrayFormatType, Request, ResponseType } from '../models/connect';
import { ACCOUNTS } from '../connection/routes.config';
import client from '../connection/client';
import { GetTransactionsByQueryConfig, GetTransactionsConfig, Transaction } from '../models/transaction';

export async function getTransactions(config: GetTransactionsConfig): Promise<Transaction[]> {
  const url = generateTransactionsUrl({ accountId: config.accountId, transactionId: config.transactionId });
  const response = await client.get({
    url,
    responseType: ResponseType.JSON,
    arrayFormat: ArrayFormatType.COMMA,
  } as Request);
  return response.data as Transaction[];
}

export async function getTransactionsByQuery(config: GetTransactionsByQueryConfig): Promise<Transaction[]> {
  const url = generateTransactionsUrl({ accountId: config.accountId });
  // @ts-ignore
  delete config.accountId;
  const response = await client.get({
    url,
    params: config,
    responseType: ResponseType.JSON,
    arrayFormat: ArrayFormatType.COMMA,
  } as Request);
  return response.data;
}

interface TransactionUrl {
  accountId: string;
  transactionId?: string;
}

function generateTransactionsUrl(config: TransactionUrl) {
  const { accountId, transactionId } = config;
  const transactionIdUrlString = transactionId ? '/' + transactionId : '';
  return `${ACCOUNTS}/${accountId}/transactions${transactionIdUrlString}`;
}
