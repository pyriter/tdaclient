import { TdaClient } from './tdaClient';
import { OptionChainConfig } from '../models/optionChain';
import { HoursConfig } from '../models/hours';
import { providerTdaClientWithLocalCacheProvider, providerTdaClientWithLocalFileProvider } from '../utils/testUtils';

describe('TdaClient', () => {
  describe('Instantiate with local cache', () => {
    let tdaClientWithLocalCache: TdaClient;
    beforeAll(async () => {
      tdaClientWithLocalCache = await providerTdaClientWithLocalCacheProvider();
    });

    it('should be able to get account information', async () => {
      const account = (await tdaClientWithLocalCache.getAccount()).pop();

      expect(account).toBeDefined();
      expect(account?.accountId).toBeDefined();
    });

    it('should be able to get options chain', async () => {
      const response = await tdaClientWithLocalCache.getOptionChain({
        symbol: 'SPY',
        strike: 470,
        strikeCount: 10,
      } as OptionChainConfig);

      expect(response.symbol).toBe('SPY');
      expect(response.status).toBe('SUCCESS');
    });

    it('should be able to market hours', async () => {
      const response = await tdaClientWithLocalCache.getHours({
        markets: ['EQUITY', 'OPTION'],
      } as HoursConfig);

      const expectedEquity = response.equity?.EQ || response.equity?.equity;
      const expectedOption = response.option?.EQO || response.option?.option;
      expect(expectedEquity?.marketType).toBe('EQUITY');
      expect(expectedOption?.marketType).toBe('OPTION');
    });
  });

  describe('Instantiate with locale file credential provider', () => {
    let tdaClientWithLocalFile: TdaClient;
    beforeAll(async () => {
      tdaClientWithLocalFile = await providerTdaClientWithLocalFileProvider();
    });

    it('should be able to get account information', async () => {
      const account = (await tdaClientWithLocalFile.getAccount()).pop();

      expect(account).toBeDefined();
      expect(account?.accountId).toBeDefined();
    });

    it('should be able to get options chain', async () => {
      const response = await tdaClientWithLocalFile.getOptionChain({
        symbol: 'SPY',
        strike: 470,
        strikeCount: 10,
      } as OptionChainConfig);

      expect(response.symbol).toBe('SPY');
      expect(response.status).toBe('SUCCESS');
    });

    it('should be able to market hours', async () => {
      const response = await tdaClientWithLocalFile.getHours({
        markets: ['EQUITY', 'OPTION'],
      } as HoursConfig);

      const expectedEquity = response.equity?.EQ || response.equity?.equity;
      const expectedOption = response.option?.EQO || response.option?.option;
      expect(expectedEquity?.marketType).toBe('EQUITY');
      expect(expectedOption?.marketType).toBe('OPTION');
    });
  });
});
