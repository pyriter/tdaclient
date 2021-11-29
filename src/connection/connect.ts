import * as qs from "qs";
import client from "./client";

// Axios document can be found here: https://github.com/axios/axios
export enum RestMethod {
  GET = "get",
  POST = "post",
  DELETE = "delete"
}

export enum ResponseType {
  URL_FORM_ENCODED = "form",
  JSON = "json",
  TEXT = "text",
  STREAM = "stream",
  DOCUMENT = "document",
  ARRAY_BUFFER = "arraybuffer"
}

export enum ArrayFormatType {
  COMMA = "comma",
  INDICES = "indices",
  BRACKETS = "brackets",
  REPEAT = "repeat"
}

export class Request {
  url: string;
  data: object;
  headers: object;
  params: object;
  responseType: ResponseType = ResponseType.JSON;
  arrayFormat: ArrayFormatType = ArrayFormatType.COMMA;
}

export async function get(request: Request) {
  const config = {
    ...request,
    method: RestMethod.GET,
    paramsSerializer: (params) => qs.stringify(params, {arrayFormat: request.arrayFormat})
  };
  return await connect(config);
}

export async function post(request: Request) {
  const config = {
    ...request,
    method: RestMethod.POST
  };

  handleResponseType(config);

  return await connect(config);
}

export async function del(request: Request) {
  const config = {
    ...request,
    method: RestMethod.DELETE
  };

  handleResponseType(config);

  return await connect(config);
}

function handleResponseType(config) {
  const {responseType: requestType} = config;
  switch (requestType) {
    case ResponseType.URL_FORM_ENCODED:
      const header = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
      config.headers = config.headers || {};
      config.headers = {
        ...config.headers,
        ...header
      };
      config.data = qs.stringify(config.data);
  }
}

export async function connect(config) {
  config = config || {};
  try {
    return await client(config);
  } catch (error) {
    let message = `Failed to ${config.method} ${config.url}. ${error}.`;
    if (error && error.response && error.response.data)
      message += `\nResponse from server ${JSON.stringify(error.response.data, null, "\t")}`;
    message += `\nRequest config: ${JSON.stringify(config, null, "\t")}`;
    console.error(message);

    // @ts-ignore
    return Promise.reject(new Error(message, {cause: error}));
  }
}
