import React from "react";
import renderer from "react-test-renderer";
import PaymentContainer from "../PaymentContainer";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

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
    project: null,
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
            <PaymentContainer project={{ id: 123 }} />
          </Provider>
        </BrowserRouter>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
