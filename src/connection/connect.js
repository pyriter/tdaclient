/**
 * Copyright © 2020
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */

import qs from "qs";
import client from "./client";

// Axios document can be found here: https://github.com/axios/axios
export const RestMethod = Object.freeze({
  GET: "get",
  POST: "post"
});

export const ResponseType = Object.freeze({
  URL_FORM_ENCODED: "form",
  JSON: "json",
  TEXT: "text",
  STREAM: "stream",
  DOCUMENT: "document",
  ARRAY_BUFFER: "arraybuffer"
});

export const ArrayFormatType = {
  COMMA: "comma",
  INDICES: "indices",
  BRACKETS: "brackets",
  REPEAT: "repeat"
};

export async function get({
                            url,
                            headers,
                            params,
                            responseType = ResponseType.JSON,
                            arrayFormat = ArrayFormatType.COMMA
                          }) {
  const config = {
    ...arguments[0],
    method: RestMethod.GET,
    paramsSerializer: function (params) {
      return qs.stringify(params, {arrayFormat});
    }
  };
  return await connect(config);
}

export async function post({
                             url, // `url` is the server URL that will be used for the request
                             data,
                             headers,
                             params,
                             responseType = ResponseType.JSON
                           }) {
  const config = {
    ...arguments[0],
    method: RestMethod.POST
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
    return Promise.reject(error);
  }
}
