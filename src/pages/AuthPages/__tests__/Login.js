import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter, Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Login from "../Login";
import { mount } from "enzyme/build";

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
    let authenticateMock = jest.fn().mockImplementation((credentials) => {
      console.log("called with", credentials);
      return credentials;
    });

    const wrapper = mount(
      <BrowserRouter>
        <Provider store={mockAppStore()}>
          <Login
            authenticate={authenticateMock}
            auth={{ isAuthenticated: false }}
          />
        </Provider>
      </BrowserRouter>
    );

    wrapper
      .find("#password")
      .at(1)
      .simulate("change", { target: { value: 123456 } });

    wrapper
      .find("#email")
      .at(1)
      .simulate("change", { target: { value: "katuula@gmail.com" } });

    wrapper.find("#login-button > button").simulate("click");

    console.log(wrapper.instance().props);

    /* const password = wrapper.getByTestId("password");
    fireEvent.change(password, { target: { value: "123456" } });
    const email = wrapper.getByTestId("email");
    fireEvent.change(email, { target: { value: "katuula@gmail.com" } });
    const btn = wrapper.getByTestId("login-button");
    await fireEvent.click(btn);
    expect(authenticateMock).toHaveBeenCalled();
    expect(authenticate).toEqual({
      username: "katuula@gmail.com",
      password: "123456",
    }); */
  });

  it("should redirect if authenticated", async () => {
    const history = createMemoryHistory();

    jest.mock("react-router-dom", () => ({
      useHistory: () => ({
        push: jest.fn(),
      }),
    }));

    render(
      <Router history={history}>
        <Provider store={mockAppStore()}>
          <Login auth={{ isAuthenticated: true }} />
        </Provider>
      </Router>
    );
  });
});
