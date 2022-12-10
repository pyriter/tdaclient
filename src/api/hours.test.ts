import { provideClientWithLocalFileCredentialProvider } from '../utils/testUtils';
import { HoursApi } from './hours';

describe('Hours', () => {
  const hoursApi = new HoursApi(provideClientWithLocalFileCredentialProvider());

  it('should be able to get market hours for EQUITY', async () => {
    const response = await hoursApi.getHours({
      markets: ['EQUITY'],
    });
    const hour = response.equity?.EQ || response.equity?.equity;
    expect(hour?.isOpen).toBeDefined();
    expect(hour?.marketType).toBe('EQUITY');
  });

  it('should be able to get market hours for OPTION', async () => {
    const response = await hoursApi.getHours({
      markets: ['OPTION'],
    });
    const hour = response.option?.EQO || response.option?.option;
    expect(hour?.isOpen).toBeDefined();
    expect(hour?.marketType).toBe('OPTION');
  });

  it('should be able to get market hours for FUTURE', async () => {
    const response = await hoursApi.getHours({
      markets: ['FUTURE'],
    });
    const hour = response.future?.DFE || response.future?.future;
    expect(hour?.isOpen).toBeDefined();
    expect(hour?.marketType).toBe('FUTURE');
  });

  it('should be able to get market hours for BOND', async () => {
    const response = await hoursApi.getHours({
      markets: ['BOND'],
    });
    const hour = response.bond?.BON || response.bond?.bond;
    expect(hour?.isOpen).toBeDefined();
    expect(hour?.marketType).toBe('BOND');
  });

  it('should be able to get market hours for FOREX', async () => {
    const response = await hoursApi.getHours({
      markets: ['FOREX'],
    });
    const hour = response.forex?.forex;
    expect(hour?.isOpen).toBeDefined();
    expect(hour?.marketType).toBe('FOREX');
  });
});
