import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Login from "../Login";
import { mount } from "enzyme/build";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";

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
    user: { uid: 123, email: "test@gmail.com" },
    isMakingRequest: {},
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("Login snapshot test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore()}>
            <Login />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should call authenticate function", async () => {
    const store = mockAppStore();
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );

    wrapper
      .find("#password")
      .at(1)
      .simulate("change", { target: { value: "password123" } });

    wrapper
      .find("#email")
      .at(1)
      .simulate("change", { target: { value: "test@gmail.com" } });

    wrapper.find("#login-button").simulate("submit");

    const expectedActions = [
      {
        type: "LOGIN_START",
        credentials: { username: "test@gmail.com", password: "password123" },
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should not call authenticate function if no username and password", async () => {
    const store = mockAppStore();
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <Login />
        </Provider>
      </BrowserRouter>
    );

    wrapper.find("#login-button").simulate("submit");
    expect(store.getActions()).toEqual([]);
  });

  it("should redirect if authenticated", async () => {
    render(
      <MemoryRouter>
        <Provider
          store={mockAppStore({
            Auth: { user: { id: 123456 }, isMakingRequest: {} },
          })}
        >
          <Login />
        </Provider>
      </MemoryRouter>
    );
    expect(mockHistoryPush).toHaveBeenCalledWith("/dashboard");
  });
});
