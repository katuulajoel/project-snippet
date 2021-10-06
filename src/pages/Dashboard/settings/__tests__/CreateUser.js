import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CreateUser from "../Invite/CreateUser";
import store from "../../../../store";

afterEach(cleanup);

describe("CreateUser comp test", () => {
  it("CreateUser component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <CreateUser />
        </Router>
      </Provider>
    );

    expect(asFragment(<CreateUser />)).toMatchSnapshot();
  });
});
