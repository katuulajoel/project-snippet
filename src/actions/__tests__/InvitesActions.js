import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../InvitesActions";
import * as actionTypes from "../utils/ActionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

jest.mock("axios", () => {
  return {
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() },
    },
    defaults: { xsrfCookieName: "csrftoken" },
    post: jest.fn(),
    get: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
  };
});

describe("Invoice actions tests", () => {
  beforeEach(() => {
    axios.post.mockClear();
    jest.clearAllMocks();
    store.clearActions();
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it("should fetch invites", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
    const expectedActions = [
      {
        type: actionTypes.SET_PENDING_INVITES,
        payload: [],
      },
    ];

    await store.dispatch(actions.getPendingInvites());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
