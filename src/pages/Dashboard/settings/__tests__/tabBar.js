import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import TabBar from "../Invite/tabBar";
import store from "../../../../store";

afterEach(cleanup);

describe("TabBar comp test", () => {
  it("TabBar component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <TabBar />
        </Router>
      </Provider>
    );

    expect(asFragment(<TabBar />)).toMatchSnapshot();
  });
});
