import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import AddAdminEmail from "../account/AddAdminEmail";
import store from "../../../../redux/store";

afterEach(cleanup);
describe("AddAdminEmail layout test", () => {
  it("Snapshot test for AddAdminEmail component", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <AddAdminEmail />
        </Router>
      </Provider>
    );

    expect(asFragment(<AddAdminEmail />)).toMatchSnapshot();
  });
});
