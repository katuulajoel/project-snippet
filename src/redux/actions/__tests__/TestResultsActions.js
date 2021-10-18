import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import * as actions from '../TestResultsActions';
import {
  CREATE_RESULT_START,
  CREATE_RESULT_SUCCESS,
  CREATE_RESULT_FAILED,
  UPDATE_RESULT_START,
  UPDATE_RESULT_SUCCESS,
  UPDATE_RESULT_FAILED,
  FETCH_RESULT_START,
  FETCH_RESULT_SUCCESS,
  FETCH_RESULT_FAILED,
  DELETE_RESULT_START,
  DELETE_RESULT_SUCCESS,
  DELETE_RESULT_FAILED,
  SET_FILTERS,
} from '../../../configs/constants/ActionTypes';
import { dummyResult } from '../../../pages/Dashboard/tests/__tests__/Results';
import { dummyResults } from '../../../pages/Dashboard/tests/__tests__/Results';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

jest.mock('axios', () => {
  return {
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    defaults: { xsrfCookieName: 'csrftoken' },
    post: jest.fn().mockImplementation(() => Promise.resolve()),
    get: jest.fn(),
    patch: jest.fn().mockImplementation(() => Promise.resolve()),
    delete: jest.fn(),
  };
});

describe('test actions tests', () => {
  beforeEach(() => {
    axios.post.mockClear();
    jest.clearAllMocks();
    store.clearActions();
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it('should dispatch CREATE_RESULT_SUCCESS', async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: dummyResult }));
    const expectedActions = [
      { type: CREATE_RESULT_START, data: dummyResult },
      {
        result: dummyResult,
        type: CREATE_RESULT_SUCCESS,
      },
    ];

    await store.dispatch(actions.createResult(dummyResult, '6LMlpGnA'));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it('should dispatch CREATE_RESULT_FAILED with error', async () => {
    const error = {
      message: 'Error!',
    };
    axios.post.mockRejectedValue(error);

    const expectedActions = [
      { type: CREATE_RESULT_START, data: null },
      {
        error: null,
        type: CREATE_RESULT_FAILED,
      },
    ];

    await store.dispatch(actions.createResult(null, '6LMlpGnA'));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it('should dispatch FETCH_RESULT_SUCCESS', async () => {
    axios.get.mockReturnValue(
      Promise.resolve({
        data: {
          count: 2,
          next: null,
          previous: null,
          results: dummyResults,
        },
      })
    );
    const expectedActions = [
      { type: FETCH_RESULT_START },
      {
        count: 2,
        items: dummyResults,
        next: null,
        previous: null,
        type: FETCH_RESULT_SUCCESS,
      },
    ];

    await store.dispatch(actions.fetchResults('6LMlpGnA', { page_size: 20 }));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it('should dispatch FETCH_RESULT_FAILED with error', async () => {
    const error = {
      message: 'Error!',
    };
    axios.get.mockRejectedValue(error);

    const expectedActions = [
      { type: FETCH_RESULT_START },
      {
        error: null,
        type: FETCH_RESULT_FAILED,
      },
    ];

    await store.dispatch(actions.fetchResults(null));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it('should dispatch UPDATE_RESULT_SUCCESS', async () => {
    axios.patch.mockReturnValue(Promise.resolve({ data: dummyResult }));
    const expectedActions = [
      { type: UPDATE_RESULT_START, id: 10, result: dummyResult },
      {
        id: dummyResult.id,
        result: dummyResult,
        type: UPDATE_RESULT_SUCCESS,
      },
    ];

    await store.dispatch(actions.updateResult(dummyResult.id, dummyResult, '6LMlpGnA'));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it('should dispatch UPDATE_RESULT_FAILED', async () => {
    const error = {
      message: 'Error!',
    };
    axios.patch.mockRejectedValue(error);
    const expectedActions = [
      { type: UPDATE_RESULT_START, id: 10, result: null },
      {
        id: dummyResult.id,
        error: null,
        result: null,
        type: UPDATE_RESULT_FAILED,
      },
    ];

    await store.dispatch(actions.updateResult(dummyResult.id, null, '6LMlpGnA'));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it('should dispatch DELETE_RESULT_SUCCESS', async () => {
    axios.delete.mockReturnValue(
      Promise.resolve({
        data: {
          id: 123,
        },
      })
    );
    const expectedActions = [
      { type: DELETE_RESULT_START, id: 123 },
      {
        id: 123,
        type: DELETE_RESULT_SUCCESS,
      },
    ];

    await store.dispatch(actions.deleteResult(123));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it('should dispatch DELETE_RESULT_FAILED', async () => {
    const error = {
      message: 'Error!',
    };
    axios.delete.mockRejectedValue(error);
    const expectedActions = [
      { type: DELETE_RESULT_START, id: null },
      {
        error: null,
        type: DELETE_RESULT_FAILED,
      },
    ];

    await store.dispatch(actions.deleteResult(null));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it('should dispatch SET_FILTERS', async () => {
    const expectedActions = [
      {
        type: SET_FILTERS,
        filters: {
          page_size: 20,
        },
      },
    ];

    await store.dispatch(actions.setSelectedFilters({ page_size: 20 }));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
