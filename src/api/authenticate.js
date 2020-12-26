import routes from "../connection/routes.config.js";
import {post, ResponseType} from "../connection/connect";

const OAUTH2_TOKEN = `${routes.hostname}${routes.endpoints.oauth2Token}`;

export const GrantType = {
  AUTHORIZATION_CODE: "authorization_code",
  REFRESH_TOKEN: "refresh_token"
};

export async function oauth({
                              client_id,
                              redirect_uri,
                              refresh_token,
                              code,
                              grant_type,
                              access_type = "offline" // TODO: should change this because you always get a refresh token for every call which is bad
                            }) {
  const response = await post({
    url: OAUTH2_TOKEN,
    data: {
      grant_type,
      refresh_token,
      access_type,
      code,
      client_id,
      redirect_uri
    },
    responseType: ResponseType.URL_FORM_ENCODED
  });
  return response.data;
}
