import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import configureStore from "redux-mock-store";

const middlewares = [thunk];

const mockAppState = {
  Auth: {
    user: { uid: 123, email: "katuula@gmail.com" },
    isAuthenticating: {},
  },
};

const mockAppStore = () => {
  const mockStore = configureStore(middlewares);
  return mockStore(mockAppState);
};

describe("App.js", () => {
  it("Snapshot test for App component", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore()}>
            <App />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
