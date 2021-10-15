/* eslint-disable no-unused-vars */ // TODO:
import React from "react";
import renderer from "react-test-renderer";
import ProjectPage from "..";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { ThemeProvider } from "styled-components";
import theme from "../../../../../assets/theme";
import * as actions from "../../../../../redux/actions/ProjectActions";
import * as access from "../../../../../utils/auth";

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
  Projects: {
    isMakingRequest: {},
    project: { id: 124 },
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state);
};

describe("Dashboard test", () => {
  let fetchProjectStub = "";
  let hasProjectAccessStub = "";
  beforeAll(() => {
    fetchProjectStub = jest.spyOn(actions, "fetchProject");
    hasProjectAccessStub = jest
      .spyOn(access, "hasProjectAccess")
      .mockReturnValue(true);
  });
  it("Should match snapshot test", () => {
    global.URL.createObjectURL = jest.fn(() => "details");
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore(mockAppState)}>
            <ThemeProvider theme={theme}>
              <ProjectPage match={{ path: "/projects", params: { id: 123 } }} />
            </ThemeProvider>
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should show loading indicator when no project or requesting project", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider
            store={mockAppStore({
              ...mockAppState,
              Projects: { isMakingRequest: {}, project: null },
            })}
          >
            <ThemeProvider theme={theme}>
              <ProjectPage match={{ path: "/projects" }} />
            </ThemeProvider>
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
