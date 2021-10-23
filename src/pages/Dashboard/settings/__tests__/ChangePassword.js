import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ChangePassword from "../account/ChangePassword";
import store from "../../../../redux/store";

afterEach(cleanup);
describe("ChangePassword layout test", () => {
  it("Snapshot test for ChangePassword component", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <ChangePassword />
        </Router>
      </Provider>
    );

    expect(asFragment(<ChangePassword />)).toMatchSnapshot();
  });
});
