import { AccessType, GrantType, oauth, OAuthData } from '../api/authenticate';
import { getCredentials, updateCredentials } from '../providers/credentialsProvider';
import { AUTHENTICATION } from './routes.config';

export default function addInterceptor(client) {
  client.interceptors.request.use(requestSuccessInterceptor);
}

async function requestSuccessInterceptor(config) {
  await addAuthorizationTokenToHeader(config);
  return config;
}

async function addAuthorizationTokenToHeader(config) {
  if (config.url.includes(AUTHENTICATION)) return;
  const accessToken = await getAccessToken();
  config.headers.Authorization = `Bearer ${accessToken}`;
}

async function getAccessToken() {
  await checkAndRefreshAccessToken();
  const { access_token } = getCredentials();
  return access_token;
}

async function checkAndRefreshAccessToken() {
  const { client_id, redirect_uri, refresh_token } = getCredentials();
  const credentials = await oauth({
    client_id,
    redirect_uri,
    refresh_token,
    grant_type: GrantType.REFRESH_TOKEN,
    access_type: AccessType.OFFLINE,
  } as OAuthData);
  updateCredentials(credentials);
}
