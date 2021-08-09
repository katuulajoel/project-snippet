import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import PasswordResetConfirm from "../PasswordResetConfirm";
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
    errors: {},
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("Login snapshot test", () => {
  it("Should match snapshot test", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore()}>
            <PasswordResetConfirm />
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
          <PasswordResetConfirm />
        </Provider>
      </BrowserRouter>
    );

    wrapper
      .find("#password1")
      .at(1)
      .simulate("change", { target: { value: "password123" } });

    wrapper
      .find("#password2")
      .at(1)
      .simulate("change", { target: { value: "password123" } });

    wrapper.find("button[type='submit']").simulate("submit");

    const expectedActions = [
      {
        type: "RESET_PASSWORD_CONFIRM_START",
        credentials: {
          uid: "",
          token: "",
          password1: "password123",
          password2: "password123",
        },
      },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should not call resetPasswordConfirm function if no username and password", async () => {
    const store = mockAppStore();
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <PasswordResetConfirm />
        </Provider>
      </BrowserRouter>
    );

    wrapper.find("button[type='submit']").simulate("submit");
    expect(store.getActions()).toEqual([]);
  });

  it("should redirect if authenticated", async () => {
    render(
      <MemoryRouter>
        <Provider
          store={mockAppStore({
            Auth: { user: { id: 123456 }, isMakingRequest: {}, errors: {} },
          })}
        >
          <PasswordResetConfirm />
        </Provider>
      </MemoryRouter>
    );
    expect(mockHistoryPush).toHaveBeenCalledWith("/dashboard");
  });
});
