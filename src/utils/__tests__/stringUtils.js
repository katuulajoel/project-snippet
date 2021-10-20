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
  image: null,
  is_developer: true,
  is_project_owner: false,
  is_project_manager: false,
  is_staff: false,
  is_admin: false,
  is_pay_admin: false,
  verified: false,
  company: null,
  avatar_url: null,
  can_contribute: false,
  date_joined: "2021-06-22T22:48:41.243936",
  agree_version: 1.2,
  agreed_at: "2021-06-22T22:48:54",
  disagree_version: 0,
  disagreed_at: null,
  payoneer_signup_url: "",
  payoneer_status: "initial",
  exact_code: "000000000000000020",
  tax_location: "world",
};

describe("string utils tests", () => {
  it("should return correct values ", () => {
    expect(utils.numberWithCommas()).toBeTruthy();
    expect(utils.numberWithCommas(14.655)).toBeTruthy();
    expect(utils.generateUserIntials(dummyUser)).toBeTruthy();
  });
});
