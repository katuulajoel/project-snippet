import React from "react";
import renderer from "react-test-renderer";
import SearchBox from "../SearchBox";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const middlewares = [thunk];

const mockAppState = {
  Auth: {},
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("Auth layout test", () => {
  it("Snapshot test for NavBar component", () => {
    const tree = renderer
      .create(
        <Provider store={mockAppStore()}>
          <SearchBox />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
