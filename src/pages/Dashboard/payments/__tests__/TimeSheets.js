import React from "react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import Timesheets from "../Timesheets";
import { render } from "@testing-library/react";

const mockAppState = {
  Projects: {
    isMakingRequest: {},
    project: { id: 123 },
    timesheets: {
      results: [
        {
          month: "12-12-12",
        },
      ],
    },
  },
};

const middlewares = [thunk];

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};

describe("TimeSheets Form tests", () => {
  it("TimeSheetsForm component snapshot", () => {
    const { asFragment } = render(
      <Provider store={mockAppStore()}>
        <Timesheets />
      </Provider>
    );
    expect(asFragment(<Timesheets />)).toMatchSnapshot();
  });
});
