/**
 * Copyright © 2020
 * Author: Phong Vuong (pyriter.io@gmail.com)
 */

import createClient from "./client";
import qs from "qs";

// Axios document can be found here: https://github.com/axios/axios
const RestMethod = Object.freeze({
  GET: "get",
  POST: "post"
});

const ResponseType = Object.freeze({
  URL_FORM_ENCODED: "form",
  JSON: "json"
});

export async function get({
                            url,
                            headers,
                            params,
                            responseType = "json" // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
                          }) {
  const config = {
    ...arguments[0],
    method: RestMethod.GET
  };
  return await connect(config);
}

export async function post({
                             url, // `url` is the server URL that will be used for the request
                             data,
                             headers,
                             params,
                             responseType = "json" // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
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
  const client = createClient();
  try {
    let response = await client(config);
    return response.data;
  } catch (error) {
    let message = `Failed to ${config.method} ${config.url}. ${error}.`;
    if (error && error.response && error.response.data)
      message += `\nResponse from server ${JSON.stringify(error.response.data, null, '\t')}`;
    message += `\nRequest config: ${JSON.stringify(config, null, '\t')}`;
    console.error(message);
    return Promise.reject(error);
  }
}
