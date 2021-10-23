import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import ChangeEmail from "../account/ChangeEmail";
import store from "../../../../redux/store";

afterEach(cleanup);
describe("ChangeEmail layout test", () => {
  it("Snapshot test for ChangeEmail component", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <ChangeEmail />
        </Router>
      </Provider>
    );

    expect(asFragment(<ChangeEmail />)).toMatchSnapshot();
  });
});
