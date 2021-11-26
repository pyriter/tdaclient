import {getWatchList} from "./watchlist";

describe("WatchLists", () => {
  it("should be able to get all watchlist for an account", async () => {
    const response = await getWatchList();
    expect(response);
  });
});
