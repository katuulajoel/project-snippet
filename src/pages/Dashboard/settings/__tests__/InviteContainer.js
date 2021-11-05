import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import InviteContainer from "../Invite/InviteContainer";
import store from "../../../../redux/store";

afterEach(cleanup);

describe("TabBar comp test", () => {
  it("TabBar component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <InviteContainer />
        </Router>
      </Provider>
    );

    expect(asFragment(<InviteContainer />)).toMatchSnapshot();
  });
});
