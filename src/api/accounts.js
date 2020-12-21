import {get, ResponseType} from "../connection/connect";
import {endpoints, hostname} from "../routes/config.json";

const ACCOUNTS = `${hostname}${endpoints.accounts}`;

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
