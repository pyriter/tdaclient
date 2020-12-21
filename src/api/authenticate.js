import {hostname, endpoints} from "../routes/config.json";
import {post, ResponseType} from "../connection/connect";

const OAUTH2_TOKEN = `${hostname}${endpoints.oauth2Token}`;

export const GrantType = {
  AUTHORIZATION_CODE: "authorization_code",
  REFRESH_TOKEN: "refresh_token"
};

export async function oauth({
                              client_id,
                              redirect_uri,
                              refresh_token,
                              code,
                              grant_type
                            }) {
  const response = await post({
    url: OAUTH2_TOKEN,
    data: {
      grant_type,
      refresh_token,
      access_type: getAccessType(grant_type),
      code,
      client_id,
      redirect_uri
    },
    responseType: ResponseType.URL_FORM_ENCODED
  });
  return response.data;
}

function getAccessType(grant_type) {
  // return grant_type === GrantType.AUTHORIZATION_CODE ? "offline" : undefined;
  return "offline"
}
