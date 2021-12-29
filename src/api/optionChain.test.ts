import { setupLocalFileCredentialProvider } from '../utils/testUtils';
import { getOptionChain } from './optionChain';
import { ContractType, OptionChainConfig, OptionStrategyType } from '../models/optionChain';

describe('OptionChain', () => {
  const symbol = 'SPY';

  beforeAll(async () => {
    await setupLocalFileCredentialProvider();
  });

  it('should get options chain given symbol', async () => {
    const response = await getOptionChain({
      symbol,
    } as OptionChainConfig);

    expect(response);
  });

  it('should get options chain given strike', async () => {
    const response = await getOptionChain({
      symbol,
      strike: 470,
      strikeCount: 10,
    } as OptionChainConfig);
    let options = values(values(response.callExpDateMap).pop());

    expect(options.length).toEqual(10);
  });

  it('should get vertical put spreads with a width of 5', async () => {
    const response = await getOptionChain({
      symbol,
      strikeCount: 1,
      interval: 1,
      contractType: ContractType.PUT,
      strategy: OptionStrategyType.VERTICAL,
    } as OptionChainConfig);

    expect(response.monthlyStrategyList.pop());
  });
});

function values(object) {
  return Object.values(object);
}
