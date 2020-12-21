import {describe, it} from "@jest/globals";
import {getAccount} from "./accounts";

describe("Accounts", () => {
  it("should be able to get all accounts", async () => {
    const response = await getAccount({});
    expect(response);
  });
});
