import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";

export abstract class Interceptor {
  async onSuccessRequestHandler(config: AxiosRequestConfig): Promise<AxiosRequestConfig> {
    return config;
  }

  async onErrorRequestHandler(error: AxiosError): Promise<AxiosError> {
    return error
  }

  async onSuccessResponseHandler(response: AxiosResponse): Promise<AxiosResponse> {
    return response;
  }

  async onErrorResponseHandler(error: AxiosError): Promise<AxiosError> {
    return error;
  }
}
