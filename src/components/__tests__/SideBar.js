import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import SideBar from "../SideBar";

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

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer
      .create(
        <Router>
          <Provider store={mockAppStore()}>
            <SideBar />
          </Provider>
        </Router>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls logout function when logout link is clicked", () => {
    const wrapper = render(
      <Router>
        <Provider store={mockAppStore()}>
          <SideBar />
        </Provider>
      </Router>
    );

    const signout = wrapper.getByTestId("signout");
    fireEvent.click(signout);
    
  });
});
