import {getAccount} from "./accounts";
import {AccountConfig} from "../models/accounts";

describe("Accounts", () => {
  it("should be able to get all accounts", async () => {
    const response = await getAccount(new AccountConfig());
    expect(response);
  });
});
