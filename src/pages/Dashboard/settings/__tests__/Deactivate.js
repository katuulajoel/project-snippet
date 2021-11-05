import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Deactivate from "../account/Deactivate";
import store from "../../../../redux/store";

afterEach(cleanup);
describe("Deactivate layout test", () => {
  it("Snapshot test for Deactivate component", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <Deactivate />
        </Router>
      </Provider>
    );

    expect(asFragment(<Deactivate />)).toMatchSnapshot();
  });
});
