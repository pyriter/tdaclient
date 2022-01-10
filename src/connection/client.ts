import axios, { AxiosInstance } from 'axios';
import { Request, ResponseType, RestMethod } from '../models/connect';
import * as qs from 'qs';
import { Interceptor } from './interceptor';

class Client {
  private readonly client: AxiosInstance;
  private static instance: Client;

  constructor() {
    this.client = axios.create();

    if (Client.instance) {
      return Client.instance;
    } else {
      Client.instance = this;
      return this;
    }
  }

  static getInstance(): Client {
    if (!Client.instance) return new Client();
    return Client.instance;
  }

  addInterceptor(interceptor: Interceptor) {
    this.client.interceptors.request.use(
      interceptor.onSuccessRequestHandler.bind(interceptor),
      interceptor.onErrorRequestHandler.bind(interceptor),
    );
    this.client.interceptors.response.use(
      interceptor.onSuccessResponseHandler.bind(interceptor),
      interceptor.onErrorResponseHandler.bind(interceptor),
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
    } catch (error: any) {
      let message = `Failed to ${config.method} ${config.url}.\n${error}.`;
      if (error && error.response && error.response.data)
        message += `\nResponse from server ${JSON.stringify(error.response.data, null, '\t')}`;
      message += `\nRequest config: ${JSON.stringify(config, null, '\t')}`;

      // @ts-ignore
      throw new Error(message, { cause: error });
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

export default Client.getInstance();
