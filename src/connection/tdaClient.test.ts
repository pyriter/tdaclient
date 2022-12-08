import { TdaClient } from './tdaClient';
import { LocalFileCredentialProvider } from '../providers/localFileCredentialProvider';
import { CREDENTIALS_FILE_NAME } from '../utils/constants';
import { OptionChainConfig } from '../models/optionChain';
import { HoursConfig } from '../models/hours';

describe('TdaClient', () => {
  let tdaClient: TdaClient;
  beforeAll(async () => {
    tdaClient = await setupTdaClient();
  });
  it('should be able to get account information', async () => {
    const account = (await tdaClient.getAccount()).pop();

    expect(account).toBeDefined();
    expect(account?.accountId).toBeDefined();
  });

  it('should be able to get options chain', async () => {
    const response = await tdaClient.getOptionChain({
      symbol: 'SPY',
      strike: 470,
      strikeCount: 10,
    } as OptionChainConfig);

    expect(response.symbol).toBe('SPY');
    expect(response.status).toBe('SUCCESS');
  });

  it('should be able to market hours', async () => {
    const response = await tdaClient.getHours({
      markets: ['EQUITY', 'OPTION'],
    } as HoursConfig);

    expect(response?.equity?.EQ.marketType).toBe('EQUITY');
    expect(response?.option?.EQO.marketType).toBe('OPTION');
  });
});

async function setupTdaClient(): Promise<TdaClient> {
  const localFileCredentialProvider = new LocalFileCredentialProvider(CREDENTIALS_FILE_NAME);
  const { access_token, client_id, refresh_token } = await localFileCredentialProvider.getCredential();
  return TdaClient.from({
    access_token,
    client_id,
    refresh_token,
  });
}
