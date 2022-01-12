import {round} from "./round";

describe("helper", () => {
  describe("round", () => {
    const testValues = [
      [undefined, 10, 10],
      [undefined, 12.123, 12],
      [undefined, 12.675, 13],
      [5, 4786.3268738093, 4785],
      [5, 4787.5268738093, 4790],
      [5, 4786.5268738093, 4785],
      [5, 4786.3268738093, 4785],
      [5, 4785, 4785],
      [5, 4785.32, 4785],
      [5, 4784.32, 4785],
      [5, 4781.32, 4780],
      [5, 4782.5, 4785],
      [10, 4782.5, 4780],
      [10, 4785, 4790]
    ]
    it("should round a whole number correctly", () => {
      for (const value of testValues) {
        const [interval, input, actual] = value;
        // @ts-ignore
        expect(round(input, interval)).toEqual(actual);
      }
    });
  });
});
