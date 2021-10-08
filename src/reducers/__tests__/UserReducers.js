import reducer from "../UserReducers";
import {
  LIST_USERS_START,
  LIST_USERS_SUCCESS,
  LIST_USERS_FAILED,
  RETRIEVE_USER_START,
  RETRIEVE_USER_SUCCESS,
  RETRIEVE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  // LIST_MORE_USERS_SUCCESS,
} from "../../actions/utils/ActionTypes";
import { dummyUsers } from "../../actions/__tests__/UserActions";

const initialState = {
  ids: {},
  users: {},
  isRetrieving: {},
};

describe("Skill reducers tests", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("handles LIST_USERS_START dispatch", () => {
    expect(reducer(initialState, { type: LIST_USERS_START })).toEqual({
      ...initialState,
    });
  });

  it("handles LIST_USERS_SUCCESS dispatches", () => {
    expect(reducer(initialState, { type: LIST_USERS_SUCCESS, items: dummyUsers })).toEqual({
      ...initialState,
      ids: {
        default: [16],
      },
      users: {
        16: dummyUsers[0],
      },
    });
  });

  it("handles LIST_USERS_FAILED dispatches", () => {
    expect(
      reducer(initialState, {
        type: LIST_USERS_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
    });
  });

  it("handles RETRIEVE_USER_START dispatches", () => {
    expect(reducer(initialState, { type: RETRIEVE_USER_START })).toEqual({
      ...initialState,
      isRetrieving: {
        default: true,
      },
    });
  });

  it("handles RETRIEVE_USER_SUCCESS dispatches", () => {
    expect(reducer(initialState, { type: RETRIEVE_USER_SUCCESS, user: dummyUsers[0] })).toEqual({
      ...initialState,
      isRetrieving: {
        default: false,
      },
      users: {
        16: dummyUsers[0],
      },
    });
  });

  it("handles RETRIEVE_USER_FAILED dispatches", () => {
    expect(reducer(initialState, { type: RETRIEVE_USER_FAILED, user: dummyUsers[0] })).toEqual({
      ...initialState,
      isRetrieving: {
        default: false,
      },
    });
  });

  // it("handles UPDATE_RESULT_START dispatches", () => {
  //   expect(reducer(initialState, { type: UPDATE_RESULT_START })).toEqual({
  //     ...initialState,
  //     isSaving: {
  //       default: true,
  //     },
  //   });
  // });

  it("handles UPDATE_USER_SUCCESS dispatches", () => {
    expect(reducer(initialState, { type: UPDATE_USER_SUCCESS, user: dummyUsers[0] })).toEqual({
      ...initialState,
      users: {
        16: dummyUsers[0],
      },
    });
  });

  // it("handles LIST_MORE_USERS_SUCCESS dispatches", () => {
  //   expect(
  //     reducer(initialState, { type: LIST_MORE_USERS_SUCCESS, items: dummyUsers, selection_key: ["6LMlpGnA"] })
  //   ).toEqual({
  //     ...initialState,
  //     previous: {
  //       default: undefined,
  //     },
  //     next: {
  //       default: undefined,
  //     },
  //     results: {
  //       0: dummyUsers,
  //     },
  //   });
  // });
});
