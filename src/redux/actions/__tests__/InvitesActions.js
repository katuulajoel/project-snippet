import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import axios from "axios";
import * as actions from "../InvitesActions";
import * as actionTypes from "../../../configs/constants/ActionTypes";

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
    request: jest.fn(),
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
        data: [],
      },
    ];

    await store.dispatch(actions.getPendingInvites());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should fetch more invites", async () => {
    axios.get.mockReturnValue(Promise.resolve({ data: [] }));
    const expectedActions = [
      {
        type: actionTypes.SET_MORE_PENDING_INVITES,
        data: [],
      },
    ];

    await store.dispatch(actions.getMorePendingInvites());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should delete invite", async () => {
    axios.delete.mockReturnValue(Promise.resolve({ data: [] }));
    const expectedActions = [
      {
        type: actionTypes.DELETE_PENDING_INVITE,
        data: 1,
      },
      {
        type: actionTypes.SET_PENDING_INVITES,
        data: [],
      },
    ];

    await store.dispatch(actions.deleteInvite(1));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("should invite", async () => {
    axios.request.mockReturnValue(Promise.resolve({ data: [] }));
    const expectedActions = [
      {
        data: false,
        type: "SET_BUTTON",
      },
    ];

    await store.dispatch(actions.invite());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });

  it("create user", async () => {
    axios.post.mockReturnValue(Promise.resolve({ data: [] }));
    const expectedActions = [
      {
        data: false,
        type: "SET_BUTTON",
      },
    ];

    store.dispatch(actions.createUser());
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
