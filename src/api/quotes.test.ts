import {setupLocalFileCredentialProvider} from '../utils/testUtils';
import {getQuotes} from "./quotes";

describe('Quotes', () => {
  beforeAll(async () => {
    await setupLocalFileCredentialProvider();
  });

  it('should get quote of single symbol', async () => {
    const symbol = "SPX";
    const quotesResponse = await getQuotes({
      symbols: [symbol]
    });
    expect(quotesResponse);
    expect(quotesResponse[symbol]);
  });

  it('should get quote of more than one symbol', async () => {
    const symbol1 = "SPX";
    const symbol2 = "SPY";
    const quotesResponse = await getQuotes({
      symbols: [symbol1, symbol2]
    });
    expect(quotesResponse);
    expect(quotesResponse[symbol1]);
    expect(quotesResponse[symbol2]);
  });
});
