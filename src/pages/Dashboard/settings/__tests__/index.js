import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Index from "../index";
import store from "../../../../redux/store";

afterEach(cleanup);

describe("Settings index comp test", () => {
  it("Settings index component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <Index />
        </Router>
      </Provider>
    );

    expect(asFragment(<Index />)).toMatchSnapshot();
  });
});
