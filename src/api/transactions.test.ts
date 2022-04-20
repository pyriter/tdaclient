import {SecuritiesAccount} from '../models/accounts';
import {TransactionType} from '../models/transaction';
import {AccountApi} from "./accounts";
import {provideClientWithLocalFileCredentialProvider} from "../utils/testUtils";
import {TransactionsApi} from "./transactions";

describe('Transactions', () => {
  let validAccount: SecuritiesAccount;
  const client = provideClientWithLocalFileCredentialProvider();
  const accountApi = new AccountApi(client);
  const transactionApi = new TransactionsApi(client);

  beforeAll(async () => {
    validAccount = await checkForValidAccount();
  });

  xit('should be able to get transactions given an account id', async () => {
    const response = await transactionApi.getTransactions({
      accountId: validAccount.accountId,
    });

    expect(response.length).toBeGreaterThanOrEqual(0);
  });

  xit('should be able to get a transaction given transaction id', async () => {
    const transactions = await transactionApi.getTransactions({
      accountId: validAccount.accountId,
    });

    const transaction = transactions.filter((t) => (t.type = TransactionType.MONEY_MARKET)).pop();

    const response = await transactionApi.getTransactions({
      accountId: validAccount.accountId,
      transactionId: transaction?.transactionId,
    });

    expect(response.length).toBeGreaterThanOrEqual(0);
  });

  it('should be able to get transactions given type and start date', async () => {
    const response = await transactionApi.getTransactionsByQuery({
      accountId: validAccount.accountId,
      startDate: '2022-03-01',
    });

    expect(response.length).toBeGreaterThanOrEqual(0);
  });

  async function checkForValidAccount(): Promise<SecuritiesAccount> {
    const accountResponse = await accountApi.getAccount();
    const validAccount = accountResponse.filter((r) => r.currentBalances.buyingPower > 10).pop();
    if (!validAccount) {
      throw Error('Since there is no money in account, we cannot run this test');
    }
    return validAccount;
  }
});
