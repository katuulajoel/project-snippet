import reducer from "../SkillReducers";
import {
  GET_SKILLS_START,
  GET_SKILLS_SUCCESS,
  GET_SKILLS_FAILED,
  INVALIDATE_SKILLS,
} from "../../../configs/constants/ActionTypes";

const initialState = {
  isMakingRequest: {},
  skills: {},
};

describe("Skill reducers tests", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("handles making requests", () => {
    expect(reducer(initialState, { type: GET_SKILLS_START })).toEqual({
      ...initialState,
      isMakingRequest: { default: true },
    });
  });

  it("handles successfull dispatches", () => {
    expect(
      reducer(initialState, { type: GET_SKILLS_SUCCESS, data: {} })
    ).toEqual({
      ...initialState,
      isMakingRequest: {
        default: false,
      },
      default: undefined,
    });
  });

  it("handles failure", () => {
    expect(
      reducer(initialState, {
        type: GET_SKILLS_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      isMakingRequest: {
        default: false,
      },
    });
  });

  it("handles invalidate skill dispatches", () => {
    expect(reducer(initialState, { type: INVALIDATE_SKILLS })).toEqual({
      ...initialState,
      isMakingRequest: {},
      skills: {
        default: [],
      },
    });
  });
});
