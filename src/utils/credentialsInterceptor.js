import {GrantType, oauth} from "../api/authenticate";
import {endpoints, hostname} from "../routes/config.json";
import {getCredentials, updateCredentials} from "./credentialsProvider";

const AUTHENTICATION = `${hostname}${endpoints.oauth2Token}`;

export default function addInterceptor(client) {
  client.interceptors.request.use(requestSuccessInterceptor);
}

async function requestSuccessInterceptor(config) {
  await addAuthorizationTokenToHeader(config);
  return config;
}

async function addAuthorizationTokenToHeader(config) {
  if (config.url.includes(AUTHENTICATION)) return;
  const access_token = await getAccessToken();
  config.headers["Authorization"] = `Bearer ${access_token}`;
}

async function getAccessToken() {
  await checkAndRefreshAccessToken();
  const {access_token} = getCredentials();
  return access_token;
}

async function checkAndRefreshAccessToken() {
  const {client_id, redirect_uri, refresh_token} = getCredentials();
  const credentials = await oauth({
    client_id,
    redirect_uri,
    refresh_token,
    grant_type: GrantType.REFRESH_TOKEN
  });
  updateCredentials(credentials);
}
