import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

export abstract class Interceptor {
  async onSuccessRequestHandler(config: AxiosRequestConfig): Promise<any> {
    return config;
  }

  async onErrorRequestHandler(error: AxiosError): Promise<any> {
    return error;
  }

  async onSuccessResponseHandler(response: AxiosResponse): Promise<any> {
    return response;
  }

  async onErrorResponseHandler(error: AxiosError): Promise<any> {
    return error;
  }
}
