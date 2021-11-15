import React from "react";
import { BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";

import TestContainer from "../TestContainer";
import { mount } from "enzyme/build";
import Results, { dummyResults } from "./Results";
import * as actions from "../../../../redux/actions/TestResultsActions";
import { toggleRightNav } from "../../../../redux/actions/UtilityActions";
import theme from "../../../../assets/theme";

const middlewares = [thunk];

const mockAppState = {
  Auth: {
    user: { uid: 123, email: "test@gmail.com" },
    isMakingRequest: false,
  },
  Invoice: {
    isMakingRequest: false,
  },
  TestResults: {
    isMakingRequest: true,
  },
};

const count = dummyResults.length;
const props = {
  testResults: { results: dummyResults },
  count,
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("Test list container", () => {
  it("Should match snapshot test", () => {
    const { asFragment } = render(
      <Provider store={mockAppStore()}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <TestContainer
              collapseRightNav={toggleRightNav}
              TestResults={mockAppState.TestResults}
            />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    );
    expect(
      asFragment(
        <TestContainer
          collapseRightNav={toggleRightNav}
          TestResults={mockAppState.TestResults}
        />
      )
    ).toMatchSnapshot();
  });

  it("should render children", async () => {
    const store = mockAppStore();
    mount(
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <TestContainer
              collapseRightNav={toggleRightNav}
              TestResults={mockAppState.TestResults}
            >
              <></>
            </TestContainer>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    const expectedActions = [{ type: "FETCH_RESULT_START" }];

    expect(store.getActions()).toMatchObject(expectedActions);
  });

  it("should show progress component", async () => {
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={mockAppStore()}>
          <ThemeProvider theme={theme}>
            <TestContainer
              collapseRightNav={toggleRightNav}
              TestResults={mockAppState.TestResults}
            >
              <></>
            </TestContainer>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(wrapper.find("Progress").exists()).toBeTruthy();
  });

  it("should load data on page change", async () => {
    const fetchResultsStub = jest.spyOn(actions, "fetchResults");
    // eslint-disable-next-line no-unused-vars
    const wrapper = mount(
      <BrowserRouter>
        <Provider store={mockAppStore()}>
          <ThemeProvider theme={theme}>
            <TestContainer
              collapseRightNav={toggleRightNav}
              TestResults={mockAppState.TestResults}
            >
              <></>
            </TestContainer>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );

    expect(fetchResultsStub).toHaveBeenCalled();
  });

  it("load new results on change to new status page", () => {
    const fetchResultsStub = jest.spyOn(actions, "fetchResults");
    const { container } = render(
      <BrowserRouter>
        <Provider store={mockAppStore()}>
          <ThemeProvider theme={theme}>
            <TestContainer
              collapseRightNav={toggleRightNav}
              TestResults={mockAppState.TestResults}
            >
              <Results {...props} />
            </TestContainer>
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    );
    expect(fetchResultsStub).toHaveBeenCalled();
    expect(fetchResultsStub).toHaveBeenCalledTimes(2);

    const h3 = container.querySelector("h3");
    expect(h3).toBeTruthy();
    expect(h3.innerHTML).toBe("Results");
  });
});
