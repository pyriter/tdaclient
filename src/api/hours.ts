import { HOURS } from '../connection/routes.config';
import { ArrayFormatType, Request, ResponseType } from '../models/connect';
import { Client } from '../connection/client';
import { Hour, HoursConfig, HoursResponse } from '../models/hours';

export class HoursApi {
  constructor(private client: Client) {}

  async getHours(config?: HoursConfig): Promise<HoursResponse> {
    const url = HOURS;
    const params = HoursApi.getParamsFromConfig(config);
    const response = await this.client.get({
      url,
      responseType: ResponseType.JSON,
      arrayFormat: ArrayFormatType.COMMA,
      params,
    } as Request);
    return response.data;
  }

  private static getParamsFromConfig(config?: HoursConfig): object | undefined {
    return {
      date: config?.date,
      markets: config?.markets?.join(','),
    };
  }
}
