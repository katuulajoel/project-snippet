import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import GenericModal from "../GenericModal";
import { cleanup, render } from "@testing-library/react";

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

afterEach(cleanup);

describe("GenericModal component test", () => {
  const store = mockAppStore();
  const options = {
    hideActions: false,
    mustRespond: false,
    title: "",
  };
  beforeEach(() => {
    useSelector.mockImplementation((callback) => callback(mockAppState));
    useDispatch.mockReturnValue(jest.fn());
  });
  afterEach(() => {
    useSelector.mockClear();
    useDispatch.mockClear();
  });

  it("GenericModal component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <GenericModal options={options} modalContent={""} />
        </Router>
      </Provider>
    );

    expect(asFragment(<GenericModal />)).toMatchSnapshot();
  });
});
