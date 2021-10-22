import React from "react";
import renderer from "react-test-renderer";
import Planning from "../Planning";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

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
    // global.URL.createObjectURL = jest.fn(() => "details");
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
});
