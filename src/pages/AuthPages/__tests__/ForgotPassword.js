import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import ForgotPassword from "../ForgotPassword";
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
            <ForgotPassword />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should call resetPassword function", async () => {
    const store = mockAppStore();
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ForgotPassword />
        </Provider>
      </BrowserRouter>
    );

    wrapper
      .find("#email")
      .at(1)
      .simulate("change", { target: { value: "test@gmail.com" } });

    wrapper.find("button[type='submit']").simulate("submit");

    const expectedActions = [
      { type: "RESET_PASSWORD_START", email: { email: "test@gmail.com" } },
    ];
    expect(store.getActions()).toEqual(expectedActions);
  });

  it("should not call resetPassword function if no email", async () => {
    const store = mockAppStore();
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={store}>
          <ForgotPassword />
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
            Auth: { user: { id: 123456 }, isMakingRequest: {} },
          })}
        >
          <ForgotPassword />
        </Provider>
      </MemoryRouter>
    );
    expect(mockHistoryPush).toHaveBeenCalledWith("/dashboard");
  });
});
