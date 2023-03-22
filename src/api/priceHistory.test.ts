import { provideClientWithLocalFileCredentialProvider } from '../utils/testUtils';
import { PriceHistoryApi } from './priceHistory';

describe('Quotes', () => {
  const priceHistoryApi = new PriceHistoryApi(provideClientWithLocalFileCredentialProvider());

  it('should get price history of SPX for a given period', async () => {
    const symbol = 'SPX';
    const priceHistoryResponse = await priceHistoryApi.getPriceHistory({
      symbol,
      periodType: 'day',
      period: 1,
      needExtendedHoursData: false,
    });

    expect(priceHistoryResponse.candles.length).toBeGreaterThan(0);
    expect(priceHistoryResponse.empty).toBeFalsy();
    expect(priceHistoryResponse.symbol).toBe('$SPX.X');
  });

  it('should get price history of SPX for a given day', async () => {
    const symbol = 'SPX';
    const priceHistoryResponse = await priceHistoryApi.getPriceHistory({
      symbol,
      needExtendedHoursData: false,
      periodType: 'day',
      startDate: 1317826080000,
    });

    expect(priceHistoryResponse.candles.length).toBeGreaterThan(0);
    expect(priceHistoryResponse.empty).toBeFalsy();
    expect(priceHistoryResponse.symbol).toBe('$SPX.X');
  });
});
