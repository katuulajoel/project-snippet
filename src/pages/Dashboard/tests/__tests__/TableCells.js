import React from "react";
import renderer from "react-test-renderer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import TableCells from "../TableCells";

const middlewares = [thunk];

const mockAppState = {
  TestResults: {
    isMakingRequest: false,
  },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state);
};

describe("TableCells Component test", () => {
  it("Should match snapshot test", () => {
    global.URL.createObjectURL = jest.fn(() => "details");
    const cell = {
      value: {
        result: 100,
        status: "failed",
      },
      column: {
        id: "code-of-conduct",
      },
    };
    const tree = renderer
      .create(
        <BrowserRouter>
          <Provider store={mockAppStore(mockAppState)}>
            <TableCells {...cell} />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
