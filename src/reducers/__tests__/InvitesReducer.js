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
        payload: { results: [] },
      })
    ).toEqual({
      results: [],
    });
  });

  it("handles successfull set data dispatch", () => {
    expect(
      reducer(initialState, {
        type: actionTypes.SET_PENDING_INVITES,
        payload: {
          count: 0,
          next: "",
          previous: null,
          results: [
            {
              id: 222,
            },
          ],
        },
      })
    ).toEqual({
      count: 0,
      next: "",
      previous: null,
      results: [
        {
          id: 222,
        },
      ],
    });
  });

  it("handles load more pending invite dispatch", () => {
    const initialState = {
      count: 0,
      next: "",
      previous: null,
      results: [
        {
          id: 222,
        },
      ],
    };

    expect(
      reducer(initialState, {
        type: actionTypes.SET_MORE_PENDING_INVITES,
        payload: [
          {
            id: 111,
          },
        ],
      })
    ).toEqual({
      count: 0,
      next: "",
      previous: null,
      results: [
        {
          id: 222,
        },
        {
          id: 111,
        },
      ],
    });
  });

  it("handles delete dispatches", () => {
    const initialState = {
      count: 0,
      next: "",
      previous: null,
      results: [
        {
          id: 222,
        },
      ],
    };

    expect(
      reducer(initialState, {
        type: actionTypes.DELETE_PENDING_INVITE,
        id: 222,
      })
    ).toEqual({
      count: 0,
      next: "",
      previous: null,
      results: [],
    });
  });
});
