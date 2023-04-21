import axios, { AxiosError, AxiosInstance } from 'axios';
import { Request, ResponseType, RestMethod } from '../models/connect';
import * as qs from 'qs';
import { Interceptor } from './interceptor';

export class Client {
  private readonly client: AxiosInstance;

  constructor() {
    this.client = axios.create();
  }

  addInterceptor(interceptor: Interceptor) {
    this.client.interceptors.request.use(
      interceptor.onSuccessRequestHandler.bind(interceptor),
      interceptor.onErrorRequestHandler.bind(interceptor),
    );
    this.client.interceptors.response.use(
      interceptor.onSuccessResponseHandler.bind(interceptor),
      (error: AxiosError) => {
        return interceptor.onErrorResponseHandler(error, this);
      },
    );
    return this;
  }

  async get(request: Request) {
    const config = {
      ...request,
      method: RestMethod.GET,
      paramsSerializer: (params) => qs.stringify(params, { arrayFormat: request.arrayFormat }),
    };
    return await this.connect(config);
  }

  async post(request: Request) {
    const config = {
      ...request,
      method: RestMethod.POST,
    };

    Client.handleResponseType(config);

    return await this.connect(config);
  }

  async put(request: Request) {
    const config = {
      ...request,
      method: RestMethod.PUT,
    };

    Client.handleResponseType(config);

    return await this.connect(config);
  }

  async del(request: Request) {
    const config = {
      ...request,
      method: RestMethod.DELETE,
    };

    Client.handleResponseType(config);

    return await this.connect(config);
  }

  async connect(config: any) {
    config = config || {};
    try {
      return await this.client(config);
    } catch (error) {
      if (error instanceof AxiosError) {
        let message = `Failed to ${config.method} ${config.url}.\n${error}.`;
        if (error && error.response && error.response.data)
          message += `\nResponse from server ${JSON.stringify(error.response.data, null, '\t')}`;
        message += `\nRequest config: ${JSON.stringify(config, null, '\t')}`;
        // @ts-ignore
        throw new Error(message, { cause: error });
      } else {
        throw error;
      }
    }
  }

  private static handleResponseType(config) {
    const { responseType: requestType } = config;
    switch (requestType) {
      case ResponseType.URL_FORM_ENCODED:
        const header = {
          'Content-Type': 'application/x-www-form-urlencoded',
        };
        config.headers = config.headers || {};
        config.headers = {
          ...config.headers,
          ...header,
        };
        config.data = qs.stringify(config.data);
    }
  }
}
