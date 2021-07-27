import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { render, fireEvent } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import SideBar from "../SideBar";

const mockAppState = {
  Auth: {
    user: { uid: 123, email: "katuula@gmail.com" },
  },
};

const mockAppStore = () => {
  const mockStore = configureStore();
  return mockStore(mockAppState);
};

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe("Sidebar component test", () => {
  const store = mockAppStore();
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockAppState));
    useDispatch.mockReturnValue(jest.fn());
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  it("Snapshot test for Sidebar component", () => {
    const tree = renderer
      .create(
        <Router>
          <Provider store={store}>
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
        <Provider store={store}>
          <SideBar />
        </Provider>
      </Router>
    );

    const signout = wrapper.getByTestId("signout");
    fireEvent.click(signout);
    const actions = store.getActions();
    console.log(signout, actions);
    expect(useDispatch).toHaveBeenCalledTimes(1);
  });
});
