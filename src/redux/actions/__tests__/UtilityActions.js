import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "../UtilityActions";
import { TOGGLE_RIGHT_NAV } from "../../../configs/constants/ActionTypes";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe("Utility actions tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    store.clearActions();
  });

  afterEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  it("should dispatch TOGGLE_RIGHT_NAV", async () => {
    const expectedActions = [
      {
        type: TOGGLE_RIGHT_NAV,
        collapsed: true,
        contentType: "nav",
      },
    ];

    await store.dispatch(actions.toggleRightNav(true, "nav"));
    const storeActions = await store.getActions();
    expect(storeActions).toEqual(expectedActions);
  });
});
