import {getCredentials} from "../providers/credentialsProvider";
import {GrantType, oauth, OAuthData} from "./authenticate";

describe("Authenticate", () => {
  it("should be able to get an new access token and refresh token", async () => {
    const {client_id, redirect_uri, refresh_token} = getCredentials();

    const response = await oauth({
      client_id,
      redirect_uri,
      refresh_token,
      grant_type: GrantType.REFRESH_TOKEN
    } as OAuthData);

    expect(response["access_token"]);
    expect(response["refresh_token"]);
  });
});
