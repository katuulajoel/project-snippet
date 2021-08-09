import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./App";
import configureStore from "redux-mock-store";

const middlewares = [thunk];

const mockHistoryPush = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const mockAppState = {
  Auth: {
    user: { uid: 123, email: "katuula@gmail.com" },
    isAuthenticating: {},
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
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

  it("should redirect if authenticated", async () => {
    render(
      <MemoryRouter>
        <Provider
          store={mockAppStore({
            Auth: { user: { id: 123456 }, isMakingRequest: {} },
          })}
        >
          <App />
        </Provider>
      </MemoryRouter>
    );
    expect(mockHistoryPush).toHaveBeenCalledWith("/dashboard");
  });
});
