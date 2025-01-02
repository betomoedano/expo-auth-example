import { add } from "../add";

describe("Add function", () => {
  it("adds numbers correctly", () => {
    const expectedResult = 2;
    const result = add(1, 1);

    expect(result).toBe(expectedResult);
  });

  it("returns a number", () => {
    expect(typeof add(1, 1)).toBe("number");
  });
});
