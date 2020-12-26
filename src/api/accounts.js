import {get, ResponseType} from "../connection/connect";
import routes from "../connection/routes.config.js";

const ACCOUNTS = `${routes.hostname}${routes.endpoints.accounts}`;

export async function getAccount({
                                   accountId,
                                   fields
                                 }) {
  const url = `${ACCOUNTS}${accountId ? "/" + accountId : ""}`;
  const response = await get({
    url,
    params: {
      fields
    },
    responseType: ResponseType.JSON
  });
  return response.data;
}
