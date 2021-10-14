import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Privacy from "../Privacy";
import store from "../../../../store";

afterEach(cleanup);

describe("Privacy layout test", () => {
  it("Privacy component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <Privacy />
        </Router>
      </Provider>
    );

    expect(asFragment(<Privacy />)).toMatchSnapshot();
  });
});
