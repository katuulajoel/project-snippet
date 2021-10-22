import React from "react";
import renderer from "react-test-renderer";
import InputGroup from "../InputGroup";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const middlewares = [thunk];

const mockAppState = {
  Auth: {},
  Invoice: { search: {} },
};

const mockAppStore = (state) => {
  const mockStore = configureStore(middlewares);
  return mockStore(state || mockAppState);
};
const appendFunc = jest.fn();
const append = <button className="tst">Add</button>;

describe("InputGroup component test", () => {
  it("Snapshot test for InputGroup component", () => {
    const tree = renderer
      .create(
        <Provider store={mockAppStore()}>
          <InputGroup appendFunc={appendFunc} value="test" append={append} />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
