import store from "../../redux/store";
import * as utils from "../auth";

jest.mock("../../redux/store");

const mockState = {
  Auth: {
    user: {
      is_admin: true,
      is_pay_admin: true,
    },
  },
};

store.getState = () => mockState;

describe("Auth utils tests", () => {
  it("should return Auth state", () => {
    expect(utils.getAuth()).toEqual(mockState.Auth);
  });

  it("should return user object", () => {
    expect(utils.getUser()).toEqual(mockState.Auth.user);
  });

  it("should resolve true for user type in state", () => {
    expect(utils.isAdmin()).toBeTruthy();
    expect(utils.isPayAdmin()).toBeTruthy();
    expect(utils.isAdminOrClient()).toBeTruthy();
    expect(utils.isAdminOrPM()).toBeTruthy();
    expect(utils.isAdminOrPMOrClient()).toBeTruthy();
    expect(utils.isPayAdminOrPM()).toBeTruthy();
  });

  it("should reject for user type not in state", () => {
    expect(utils.isDev()).toBeFalsy();
    expect(utils.isDesigner()).toBeFalsy();
    expect(utils.isClient()).toBeFalsy();
    expect(utils.isPM()).toBeFalsy();
    expect(utils.isDevOrClient()).toBeFalsy();
    expect(utils.isDevOrPM()).toBeFalsy();
  });
});
