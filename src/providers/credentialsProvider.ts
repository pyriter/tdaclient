import * as fs from "fs";

const FILE_NAME = "credentials.json";
const ENCODING = "utf8";

export function getCredentials() {
  const credentials = JSON.parse(fs.readFileSync(FILE_NAME, ENCODING));
  if (!credentials) {
    throw new Error("You need to create the test credential file if you want to run the tests. Check out the README.md file");
  }
  return credentials;
}

export function updateCredentials({
                                    access_token,
                                    refresh_token,
                                    scope,
                                    expires_in,
                                    token_type,
                                    client_id,
                                    redirect_uri
                                  }) {
  const originalCredentials = getCredentials();
  const credentials = {
    ...originalCredentials,
    ...arguments[0],
    modified_date: Date.now()
  };
  return fs.writeFileSync(FILE_NAME, JSON.stringify(credentials, null, 2), ENCODING);
}
