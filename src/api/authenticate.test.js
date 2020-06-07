import {getAccessToken} from "./authenticate";

describe("Authenticate", () => {
  describe("getAccessToken", () => {
    it("should return successfully 1", async () => {
      const response = await getAccessToken({});
      console.log(response);
      expect(response).toBeTruthy();
    });
  });
});
