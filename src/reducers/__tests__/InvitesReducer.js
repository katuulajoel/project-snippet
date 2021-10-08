import reducer from "../InvitesReducer";
import * as actionTypes from "../../actions/utils/ActionTypes";

const initialState = {};

describe("Invites reducers tests", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("handles successfull dispatches", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.SET_PENDING_INVITES,
        payload: { invites: [] },
      })
    ).toEqual({
      invites: [],
    });
  });
});
