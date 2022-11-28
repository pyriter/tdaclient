import { provideClientWithLocalFileCredentialProvider } from '../utils/testUtils';
import { HoursApi } from './hours';

describe('Hours', () => {
  const hoursApi = new HoursApi(provideClientWithLocalFileCredentialProvider());

  it('should be able to get market hours for EQUITY', async () => {
    const response = await hoursApi.getHours({
      markets: ['EQUITY'],
    });
    const hour = response.equity?.EQ;
    expect(hour?.isOpen).toBeDefined();
    expect(hour?.marketType).toBe('EQUITY');
  });

  it('should be able to get market hours for OPTION', async () => {
    const response = await hoursApi.getHours({
      markets: ['OPTION'],
    });
    const hour = response.option?.EQO;
    expect(hour?.isOpen).toBeDefined();
    expect(hour?.marketType).toBe('OPTION');
  });

  it('should be able to get market hours for FUTURE', async () => {
    const response = await hoursApi.getHours({
      markets: ['FUTURE'],
    });
    const hour = response.future?.DFE;
    expect(hour?.isOpen).toBeDefined();
    expect(hour?.marketType).toBe('FUTURE');
  });

  it('should be able to get market hours for BOND', async () => {
    const response = await hoursApi.getHours({
      markets: ['BOND'],
    });
    const hour = response.bond?.BON;
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
