import reducer from "../ProjectsReducer";
import {
  FETCH_PROJECT_START,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILED,
  FETCH_PROJECTS_START,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILED,
  FETCH_MORE_PROJECTS_START,
  FETCH_MORE_PROJECTS_SUCCESS,
  FETCH_MORE_PROJECTS_FAILED,
  CREATE_PROGRESS_EVENT_START,
  CREATE_PROGRESS_EVENT_SUCCESS,
  CREATE_PROGRESS_EVENT_FAILED,
  UPDATE_PROGRESS_EVENT_START,
  UPDATE_PROGRESS_EVENT_SUCCESS,
  UPDATE_PROGRESS_EVENT_FAILED,
  UPDATE_DOCUMENT_START,
  UPDATE_DOCUMENT_SUCCESS,
  UPDATE_DOCUMENT_FAILED,
  CREATE_DOCUMENT_START,
  CREATE_DOCUMENT_SUCCESS,
  CREATE_DOCUMENT_FAILED,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_START,
  UPDATE_PROJECT_FAILED,
  TOGGLE_PROJECT_FILTER,
  DELETE_DOCUMENT_SUCCESS,
} from "../../../configs/constants/ActionTypes";

const initialState = {
  progressEvents: [],
  documents: [],
  isMakingRequest: {},
  errors: {},
  project: null,
  projects: { results: [], next: null },
  projectPMFilter: false,
};

describe("Auth reducers tests", () => {
  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("handles successfull dispatches", () => {
    expect(
      reducer(initialState, { type: TOGGLE_PROJECT_FILTER, data: true })
    ).toEqual({
      ...initialState,
      projectPMFilter: true,
    });
    expect(
      reducer(initialState, { type: FETCH_PROJECT_SUCCESS, data: {} })
    ).toEqual({
      ...initialState,
      project: {},
    });
    expect(
      reducer(initialState, {
        type: FETCH_PROJECTS_SUCCESS,
        data: [{ id: 123 }],
      })
    ).toEqual({
      ...initialState,
      projects: [{ id: 123 }],
    });
    expect(
      reducer(
        {
          ...initialState,
          projects: { results: [{ id: 123 }], next: null },
        },
        {
          type: FETCH_MORE_PROJECTS_SUCCESS,
          data: { results: [{ id: 124 }] },
        }
      )
    ).toEqual({
      ...initialState,
      projects: { results: [{ id: 123 }, { id: 124 }] },
    });

    expect(
      reducer(
        {
          ...initialState,
          project: [{ id: 123, updated: false }],
        },
        {
          type: UPDATE_PROJECT_SUCCESS,
          data: { id: 123, updated: true },
        }
      )
    ).toEqual({
      ...initialState,
      project: [{ id: 123, updated: true }],
    });

    expect(
      reducer(
        {
          ...initialState,
          progressEvents: [{ id: 123, updated: false }],
        },
        {
          type: UPDATE_PROGRESS_EVENT_SUCCESS,
          data: { id: 123, updated: true },
        }
      )
    ).toEqual({
      ...initialState,
      progressEvents: [{ id: 123, updated: true }],
    });

    expect(
      reducer(
        {
          ...initialState,
          progressEvents: [],
        },
        {
          type: CREATE_PROGRESS_EVENT_SUCCESS,
          data: { id: 123, updated: true },
        }
      )
    ).toEqual({
      ...initialState,
      progressEvents: [{ id: 123, updated: true }],
    });

    expect(
      reducer(
        {
          ...initialState,
          documents: [{ id: 123, updated: false }],
        },
        {
          type: UPDATE_DOCUMENT_SUCCESS,
          data: { id: 123, updated: true },
        }
      )
    ).toEqual({
      ...initialState,
      documents: [{ id: 123, updated: true }],
    });

    expect(
      reducer(
        {
          ...initialState,
          documents: [],
        },
        {
          type: CREATE_DOCUMENT_SUCCESS,
          data: { id: 123, updated: true },
        }
      )
    ).toEqual({
      ...initialState,
      documents: [{ id: 123, updated: true }],
    });

    expect(
      reducer(
        {
          ...initialState,
          documents: [{ id: 123 }, { id: 124 }],
        },
        {
          type: DELETE_DOCUMENT_SUCCESS,
          data: 124,
        }
      )
    ).toEqual({
      ...initialState,
      documents: [{ id: 123 }],
    });
  });

  it("handles making requests", () => {
    expect(reducer(initialState, { type: FETCH_PROJECT_START })).toEqual({
      ...initialState,
      isMakingRequest: { fetch: true },
    });
    expect(reducer(initialState, { type: UPDATE_PROJECT_START })).toEqual({
      ...initialState,
      isMakingRequest: { update: true },
    });
    expect(reducer(initialState, { type: FETCH_PROJECTS_START })).toEqual({
      ...initialState,
      isMakingRequest: { list: true },
    });
    expect(reducer(initialState, { type: FETCH_MORE_PROJECTS_START })).toEqual({
      ...initialState,
      isMakingRequest: { fetchMore: true },
    });
    expect(
      reducer(initialState, { type: CREATE_PROGRESS_EVENT_START })
    ).toEqual({
      ...initialState,
      isMakingRequest: { createEvent: true },
    });
    expect(
      reducer(initialState, { type: UPDATE_PROGRESS_EVENT_START })
    ).toEqual({
      ...initialState,
      isMakingRequest: { updateEvent: true },
    });
    expect(reducer(initialState, { type: UPDATE_DOCUMENT_START })).toEqual({
      ...initialState,
      isMakingRequest: { updateDocument: true },
    });
    expect(reducer(initialState, { type: CREATE_DOCUMENT_START })).toEqual({
      ...initialState,
      isMakingRequest: { createDocument: true },
    });
  });

  it("handles failure", () => {
    expect(
      reducer(initialState, {
        type: FETCH_PROJECT_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { fetch: "!error" },
    });
    expect(
      reducer(initialState, {
        type: FETCH_PROJECTS_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { list: "!error" },
    });
    expect(
      reducer(initialState, {
        type: FETCH_MORE_PROJECTS_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { fetchMore: "!error" },
    });
    expect(
      reducer(initialState, {
        type: UPDATE_PROGRESS_EVENT_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { updateEvent: "!error" },
    });

    expect(
      reducer(initialState, {
        type: CREATE_PROGRESS_EVENT_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { createEvent: "!error" },
    });

    expect(
      reducer(initialState, {
        type: UPDATE_DOCUMENT_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { updateDocument: "!error" },
    });

    expect(
      reducer(initialState, {
        type: CREATE_DOCUMENT_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { createDocument: "!error" },
    });

    expect(
      reducer(initialState, {
        type: UPDATE_PROJECT_FAILED,
        error: "!error",
      })
    ).toEqual({
      ...initialState,
      errors: { update: "!error" },
    });
  });
});
