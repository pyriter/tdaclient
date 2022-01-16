import { setupLocalFileCredentialProvider } from '../utils/testUtils';
import { getOptionChain } from './optionChain';
import {ContractType, Month, OptionChainConfig, OptionStrategyType, OptionType} from '../models/optionChain';
import {getQuotes} from "./quotes";
import {QuotesIndex} from "../models/quotes";

describe('OptionChain', () => {
  const symbol = 'SPX';

  beforeAll(async () => {
    await setupLocalFileCredentialProvider();
  });

  it('should get options chain given strike', async () => {
    const response = await getOptionChain({
      symbol,
      strike: 4770,
      strikeCount: 10,
      optionType: OptionType.ALL,
    } as OptionChainConfig);
    let options = values(values(response.callExpDateMap).pop());

    expect(options.length).toEqual(10);
  });

  it('should get vertical put spreads with a width of 5', async () => {
    const response = await getOptionChain({
      symbol,
      strike: 4770,
      strikeCount: 1,
      interval: 1,
      contractType: ContractType.PUT,
      strategy: OptionStrategyType.VERTICAL,
    } as OptionChainConfig);

    expect(response.monthlyStrategyList.pop());
  });

  it('should get put spreads that are at a specific dte and price', async() => {
    const dte = 3;
    const response = await getOptionChain({
      symbol,
      strikeCount: 20,
      interval: 5,
      contractType: ContractType.PUT,
      strategy: OptionStrategyType.VERTICAL,
      expMonth: Month.JAN
    } as OptionChainConfig);

    const {monthlyStrategyList} = response;
    const monthlyStrategy = monthlyStrategyList.filter(m => m.daysToExp == dte).pop();
    const strategy = monthlyStrategy?.optionStrategyList.filter(s => (s.strategyAsk + s.strategyBid)/2 == .25 ).pop();

    expect(strategy?.strategyBid).toBeTruthy();
    expect(strategy?.strategyAsk).toBeTruthy();
  });
});

function values(object) {
  return Object.values(object);
}
