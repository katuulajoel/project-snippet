import React from "react";
import renderer from "react-test-renderer";
import Planning from "../Planning";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { mount } from "enzyme";
import * as authActions from "../../../../../utils/auth";
import * as ProjectUtils from "../../../../../utils/projectUtils";

const middlewares = [thunk];

const mockAppState = {
  Projects: {
    isMakingRequest: {},
    project: {
      id: 123,
      archived: false,
      documents: [{ id: 123, type: "planning" }],
      start_date: "2020-01-22T14:27:53",
      deadline: "2020-03-28T10:12:33.220000",
      progress_events: [
        {
          id: 123,
          type: "milestone",
          title: "Milestone 0",
          due_at: "2021-02-13T08:48:36",
        },
      ],
    },
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state);
};

describe("Project Planning test", () => {
  it("Should match snapshot test", () => {
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore(mockAppState)}>
            <Planning />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("ComponentDidMount", () => {
    jest.spyOn(authActions, "isAdminOrClient").mockReturnValue(true);
    const onManagePlanSpy = jest.spyOn(ProjectUtils, "onManagePlan");
    const wrapper = mount(
      <BrowserRouter>
        <Provider
          store={mockAppStore({
            Projects: {
              project: { ...mockAppState.Projects.project, documents: [] },
            },
          })}
        >
          <Planning />
        </Provider>
      </BrowserRouter>
    );

    console.log(wrapper.find(".section-title a").debug());

    wrapper.find(".section-title a").at(0).simulate("click");
    expect(onManagePlanSpy).toHaveBeenCalled();
    // console.log(wrapper.debug());
    // expect(showUrl.calledOnce).toBe(true)
  });
});
