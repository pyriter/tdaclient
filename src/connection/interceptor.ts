import {AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Client} from "./client";

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

  async onErrorResponseHandler(error: AxiosError, client: Client): Promise<any> {
    return error;
  }
}
