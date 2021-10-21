import React from "react";
import { Provider } from "react-redux";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore } from "../../../../redux/store";

import Payment from "../Payment";

afterEach(cleanup);

let user_admin = {
  Auth: {
    user: {
      id: 1,
      can_contribute: true,
      display_name: "Admin Tunga",
      display_type: "Client Manager",
      display_category: null,
      is_developer: false,
      is_designer: false,
      is_project_owner: false,
      is_client_manager: false,
      is_client_support_officer: false,
      is_admin: true,
      username: "admin",
      first_name: "Admin",
      last_name: "Tunga",
      email: "admin2@tunga.io",
      is_staff: true,
      settings: {
        switches: {},
        visibility: {},
      },
    },
  },
};

describe("Auth layout test", () => {
  const renderComponent = (data) =>
    render(
      <Provider store={configureStore(data)}>
        <Router>
          <Payment />
        </Router>
      </Provider>
    );

  it("Privacy component snapshot", () => {
    const { asFragment } = renderComponent(user_admin);

    expect(asFragment(<Payment />)).toMatchSnapshot();
  });
});
