import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ThemeProvider } from "styled-components";
import Tests from "../index";
import theme from "../../../../assets/theme";
import { defaultState } from "../../../../redux/reducers/TestResultsReducers";

const middlewares = [thunk];

const mockAppState = {
  Invoice: {
    isMakingRequest: false,
    search: {},
  },
  Projects: {
    isMakingRequest: false,
    project: {},
  },
  TestResults: {
    isMakingRequest: false,
    data: defaultState,
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state);
};

describe("Dashboard test", () => {
  it("Should match snapshot test", () => {
    global.URL.createObjectURL = jest.fn(() => "details");
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore(mockAppState)}>
            <ThemeProvider theme={theme}>
              <Tests />
            </ThemeProvider>
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
