import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mount } from "enzyme/build";
import { useSelector, useDispatch } from "react-redux";
import GenericModal from "../GenericModal";
import { ThemeProvider } from "styled-components";
import theme from "../../assets/theme";
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

  it("Snapshot test for GenericModal component", () => {
    const tree = mount(
      <Router>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <GenericModal options={options} modalContent={""} />
          </ThemeProvider>
        </Provider>
      </Router>
    );
    expect(tree).toMatchSnapshot();
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
