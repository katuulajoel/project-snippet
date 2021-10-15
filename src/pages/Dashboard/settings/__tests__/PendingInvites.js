import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PendingInvites from "../Invite/PendingInvites";
import store from "../../../../redux/store";

afterEach(cleanup);

describe("PendingInvites test", () => {
  it("PendingInvites component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <PendingInvites />
        </Router>
      </Provider>
    );

    expect(asFragment(<PendingInvites />)).toMatchSnapshot();
  });
});
