import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import Login from "../Login";

const mockAppStore = (errors = {}) => {
  const mockStore = configureStore();
  const initialState = {
    Auth: {
      user: {},
      isAuthenticating: {},
      errors,
    },
  };
  return mockStore(initialState);
};

describe("Login snapshot test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer
      .create(
        <Router>
          <Provider store={mockAppStore()}>
            <Login />
          </Provider>
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should ", () => {});
});
