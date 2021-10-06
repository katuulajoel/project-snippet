import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ThemeProvider } from "styled-components";
import Tests from "../index";
import theme from "../../../../theme";

const middlewares = [thunk];

const mockAppState = {
  Invoice: {
    isMakingRequest: {},
    errors: {},
    summary: {},
    list: { data: [], count: 0, next: "", previous: "" },
    invoice: {},
    csv: {},
  },
  TestResults: {
    count: {},
    errors: { fetch: null },
    isFetching: { "6LMlpGnA": true, default: false, selectionKey: "6LMlpGnA" },
    isSaved: {},
    isSaving: {},
    next: {},
    previous: {},
    results: [],
    selectedFilters: [],
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
