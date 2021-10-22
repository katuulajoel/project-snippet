import * as utils from "../stringUtils";

export const dummyUser = {
  id: 20,
  username: "bb",
  email: "bb@tunga.io",
  first_name: "bb",
  last_name: "sb",
  display_name: "bb sb",
  short_name: "bb",
  type: 1,
  avatar_url: null,
};

describe("string utils tests", () => {
  it("should return correct values ", () => {
    expect(utils.numberWithCommas()).toBeTruthy();
    expect(utils.numberWithCommas(14.655)).toBeTruthy();
    expect(utils.generateUserIntials(dummyUser)).toBeTruthy();
  });
});
