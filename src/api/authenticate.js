import {hostname, endpoints} from "../routes/config.json";
import {post} from "../connection/connect";

const PATH = `${hostname}${endpoints.authenticate}`;

export async function getAccessToken({
                                       code,
                                       clientId,
                                       redirectUri
                                     }) {
  return await post({
    url: PATH,
    data: {
      "grant_type": "authorization_code",
      "refresh_token": "",
      "access_type": "offline",
      "code": code,
      "client_id": clientId,
      "redirect_uri": redirectUri
    },
    responseType: "form"
  });
}

export async function getRefreshToken({}) {

}
