import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import DashboardLayout from "../DashboardLayout";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state);
};

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer
      .create(
        <Router>
          <Provider store={mockAppStore()}>
            <DashboardLayout />
          </Provider>
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
