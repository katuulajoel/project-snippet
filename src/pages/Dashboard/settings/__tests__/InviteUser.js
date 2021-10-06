import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import InviteUser from "../Invite/InviteUser";
import store from "../../../../store";

afterEach(cleanup);

describe("InviteUser comp test", () => {
  it("InviteUser component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <InviteUser />
        </Router>
      </Provider>
    );

    expect(asFragment(<InviteUser />)).toMatchSnapshot();
  });
});
