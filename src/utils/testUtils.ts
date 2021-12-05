import {LocalFileCredentialProvider} from "../providers/localFileCredentialProvider";
import {AuthorizationTokenInterceptor} from "../connection/authorizationTokenInterceptor";
import client from "../connection/client";
import {CREDENTIALS_FILE_NAME} from "./constants";

export function setupLocalFileCredentialProvider() {
  const provider = new LocalFileCredentialProvider(CREDENTIALS_FILE_NAME);
  const authorizationInterceptor = new AuthorizationTokenInterceptor(provider);
  client.addInterceptor(authorizationInterceptor);
}
