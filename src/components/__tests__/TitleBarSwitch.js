import React from "react";
import renderer from "react-test-renderer";
import TitleBarSwitch from "../TitleBarSwitch";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const middlewares = [thunk];

const mockAppState = {
  Auth: {},
  Invoice: { search: {} },
  Projects: {},
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer
      .create(
        <Provider store={mockAppStore()}>
          <TitleBarSwitch />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
