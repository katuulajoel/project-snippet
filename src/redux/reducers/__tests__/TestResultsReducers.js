import reducer from '../TestResultsReducers';
import {
  CREATE_RESULT_START,
  CREATE_RESULT_SUCCESS,
  CREATE_RESULT_FAILED,
  FETCH_RESULT_START,
  FETCH_RESULT_SUCCESS,
  FETCH_RESULT_FAILED,
  UPDATE_RESULT_START,
  UPDATE_RESULT_SUCCESS,
  UPDATE_RESULT_FAILED,
  LIST_MORE_RESULTS_SUCCESS,
  LIST_MORE_RESULTS_FAILED,
  DELETE_RESULT_START,
  DELETE_RESULT_SUCCESS,
  DELETE_RESULT_FAILED,
  SET_FILTERS,
} from '../../../configs/constants/ActionTypes';
import { dummyResult } from '../../../pages/Dashboard/tests/__tests__/TableCells';
import { dummyResults } from '../../../pages/Dashboard/tests/__tests__/Results';

const initialState = {
  isFetching: {},
  count: {},
  errors: {},
  isSaved: {},
  isSaving: {},
  next: {},
  previous: {},
  results: [],
  selectedFilters: [],
};

describe('Test reducers tests', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('handles CREATE_RESULT_START requests', () => {
    expect(reducer(initialState, { type: CREATE_RESULT_START })).toEqual({
      ...initialState,
      isSaved: {
        default: false,
      },
      isSaving: {
        default: true,
      },
    });
  });

  it('handles CREATE_RESULT_SUCCESS dispatches', () => {
    expect(reducer(initialState, { type: CREATE_RESULT_SUCCESS, data: dummyResult })).toEqual({
      ...initialState,
      isSaved: {
        default: true,
      },
      isSaving: {
        default: false,
      },
      errors: {
        create: undefined,
      },
    });
  });

  it('handles CREATE_RESULT_FAILED dispatches', () => {
    expect(reducer(initialState, { type: CREATE_RESULT_FAILED, data: {} })).toEqual({
      ...initialState,
      isSaved: {
        default: true,
      },
      isSaving: {
        default: false,
      },
    });
  });

  it('handles FETCH_RESULT_START dispatches', () => {
    expect(reducer(initialState, { type: FETCH_RESULT_START })).toEqual({
      ...initialState,
      isFetching: {
        default: true,
      },
    });
  });

  it('handles FETCH_RESULT_SUCCESS dispatches', () => {
    expect(reducer(initialState, { type: FETCH_RESULT_SUCCESS, items: dummyResults })).toEqual({
      ...initialState,
      isFetching: {
        default: false,
      },
      count: {
        default: undefined,
      },
      results: dummyResults,
    });
  });

  it('handles FETCH_RESULT_FAILED dispatches', () => {
    expect(reducer(initialState, { type: FETCH_RESULT_FAILED })).toEqual({
      ...initialState,
      isFetching: {
        default: false,
      },
      errors: {
        fetch: undefined,
      },
    });
  });

  it('handles UPDATE_RESULT_START dispatches', () => {
    expect(reducer(initialState, { type: UPDATE_RESULT_START })).toEqual({
      ...initialState,
      isSaving: {
        default: true,
      },
    });
  });

  it('handles UPDATE_RESULT_SUCCESS dispatches', () => {
    expect(reducer(initialState, { type: UPDATE_RESULT_SUCCESS, data: dummyResult })).toEqual({
      ...initialState,
      isSaving: {
        default: false,
      },
    });
  });

  it('handles UPDATE_RESULT_FAILED dispatches', () => {
    expect(reducer(initialState, { type: UPDATE_RESULT_FAILED })).toEqual({
      ...initialState,
      errors: {
        update: undefined,
      },
      isSaving: {
        default: false,
      },
    });
  });

  it('handles LIST_MORE_RESULTS_SUCCESS dispatches', () => {
    expect(reducer(initialState, { type: LIST_MORE_RESULTS_SUCCESS, items: dummyResults })).toEqual({
      ...initialState,
      previous: {
        default: undefined,
      },
      next: {
        default: undefined,
      },
      results: {
        0: dummyResults[0],
        1: dummyResults[1],
        2: dummyResults[2]
      },
    });
  });

  it('handles LIST_MORE_RESULTS_FAILED dispatches', () => {
    expect(reducer(initialState, { type: LIST_MORE_RESULTS_FAILED })).toEqual({
      ...initialState,
      count: {
        default: 0,
      },
    });
  });

  it('handles DELETE_RESULT_START dispatches', () => {
    expect(reducer(initialState, { type: DELETE_RESULT_START, data: { id: 123 } })).toEqual({
      ...initialState,
      isSaving: {
        default: true,
      },
    });
  });

  it('handles DELETE_RESULT_SUCCESS dispatches', () => {
    expect(reducer(initialState, { type: DELETE_RESULT_SUCCESS, data: { id: 123 } })).toEqual({
      ...initialState,
      isSaving: {
        default: false,
      },
      results: {
        0: dummyResults[0],
        1: dummyResults[1],
        2: dummyResults[2]
      },
    });
  });

  it('handles DELETE_RESULT_FAILED dispatches', () => {
    expect(reducer(initialState, { type: DELETE_RESULT_FAILED })).toEqual({
      ...initialState,
      errors: {
        update: undefined,
      },
      isSaving: {
        default: false,
      },
    });
  });

  it('handles SET_FILTERS dispatches', () => {
    expect(reducer(initialState, { type: SET_FILTERS, filters: { search: '' } })).toEqual({
      ...initialState,
      selectedFilters: {
        search: '',
      },
    });
  });
});
