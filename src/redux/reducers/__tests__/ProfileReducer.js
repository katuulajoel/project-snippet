import reducer from "../ProfileReducer";
import {
  SET_USER_SETTINGS,
  SET_USER_PROFILE,
} from "../../../configs/constants/ActionTypes";

const initialState = {};

describe("Test reducers tests", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("handles SET_USER_PROFILE dispatches", () => {
    expect(
      reducer(initialState, { type: SET_USER_PROFILE, data: { id: 123 } })
    ).toEqual({
      ...initialState,
      id: 123,
    });
  });

  it("handles SET_USER_SETTINGS dispatches", () => {
    expect(
      reducer(initialState, { type: SET_USER_SETTINGS, data: { id: 123 } })
    ).toEqual({
      ...initialState,
      settings: { id: 123 },
    });
  });
});
