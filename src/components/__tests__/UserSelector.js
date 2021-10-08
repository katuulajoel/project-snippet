import React from "react";
// import renderer from "react-test-renderer";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mount } from "enzyme/build";
// import { render, fireEvent } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import UserSelector from "../UserSelector";
import { ThemeProvider } from "styled-components";
import theme from "../../theme";

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

describe("GenericModal component test", () => {
  const store = mockAppStore();
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
            <UserSelector />
          </ThemeProvider>
        </Provider>
      </Router>
    );
    expect(tree).toMatchSnapshot();
  });

  // it("calls logout function when logout link is clicked", () => {
  //   const wrapper = render(
  //     <Router>
  //       <Provider store={store}>
  //         <GenericModal />
  //       </Provider>
  //     </Router>
  //   );

  //   const signout = wrapper.getByTestId("signout");
  //   fireEvent.click(signout);
  //   expect(useDispatch).toHaveBeenCalledTimes(1);
  // });
});
