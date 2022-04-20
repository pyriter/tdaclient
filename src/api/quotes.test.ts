import { provideClientWithLocalFileCredentialProvider } from '../utils/testUtils';
import { QuotesApi } from './quotes';

describe('Quotes', () => {
  const quotesApi = new QuotesApi(provideClientWithLocalFileCredentialProvider());

  it('should get quote of single symbol', async () => {
    const symbol = 'SPX';
    const quotesResponse = await quotesApi.getQuotes({
      symbols: [symbol],
    });
    expect(quotesResponse);
    expect(quotesResponse[symbol]);
  });

  it('should get quote of more than one symbol', async () => {
    const symbol1 = 'SPX';
    const symbol2 = 'SPY';
    const quotesResponse = await quotesApi.getQuotes({
      symbols: [symbol1, symbol2],
    });
    expect(quotesResponse);
    expect(quotesResponse[symbol1]);
    expect(quotesResponse[symbol2]);
  });
});
