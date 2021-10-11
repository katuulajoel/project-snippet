import React from "react";
import renderer from "react-test-renderer";
import ProjectList from "../ProjectList";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import thunk from "redux-thunk";
import { mount } from "enzyme/build";

const middlewares = [thunk];

const mockAppState = {
  Auth: {},
  Projects: {
    isMakingRequest: {},
    errors: {},
    projects: {
      results: [
        {
          id: 1,
          content_type: 91,
          pm: null,
          interest_polls: [
            {
              id: 123,
              created_by: {
                id: 1,
                display_name: "Test user",
                avatar_url: null,
              },
            },
          ],
          participation: [
            {
              id: 123,
              user: { id: 1, display_name: "Test user", avatar_url: null },
            },
          ],
          category: "dedicated",
          title: "Test Project (updated)",
          type: "web",
          stage: "active",
          deadline: "2020-03-28T10:12:33.220000",
        },
      ],
      count: 0,
      next: "",
      previous: "",
    },
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state);
};

describe("Auth layout test", () => {
  it("Snapshot test for Login component", () => {
    const tree = renderer
      .create(
        <Provider store={mockAppStore(mockAppState)}>
          <BrowserRouter>
            <ProjectList stage={"active"} archived={"False"} />
          </BrowserRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should show right message when no projects", () => {
    const wrapper = mount(
      <Provider
        store={mockAppStore({
          ...mockAppState,
          Projects: { ...mockAppState.Projects, projects: { results: [] } },
        })}
      >
        <BrowserRouter>
          <ProjectList stage={"active"} archived={"False"} />
        </BrowserRouter>
      </Provider>
    );

    expect(wrapper.find("SummaryPlaceholder").props().description).toEqual(
      "Seems you have not created any projects."
    );
  });

  it("should show right message when no opportunities", () => {
    const wrapper = mount(
      <Provider
        store={mockAppStore({
          ...mockAppState,
          Projects: { ...mockAppState.Projects, projects: { results: [] } },
        })}
      >
        <BrowserRouter>
          <ProjectList stage={"opportunity"} archived={"False"} />
        </BrowserRouter>
      </Provider>
    );

    expect(wrapper.find("SummaryPlaceholder").props().description).toEqual(
      "Seems you have not created any opportunities."
    );
  });
});
