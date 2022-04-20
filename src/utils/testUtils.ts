import { LocalFileCredentialProvider } from '../providers/localFileCredentialProvider';
import { AuthorizationTokenInterceptor } from '../connection/authorizationTokenInterceptor';
import { CREDENTIALS_FILE_NAME } from './constants';
import {Client} from "../connection/client";

export function provideClientWithLocalFileCredentialProvider() {
  const provider = new LocalFileCredentialProvider(CREDENTIALS_FILE_NAME);
  const client = new Client();
  const authorizationInterceptor = new AuthorizationTokenInterceptor(provider);
  client.addInterceptor(authorizationInterceptor);
  return client;
}
