import React from "react";
import { Provider } from "react-redux";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Account from "../account/Account";
import store from "../../../../redux/store";
import { configureStore } from "../../../../redux/store";

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
      is_project_owner: true,
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

describe("Account layout test", () => {
  const renderComponent = (data) =>
    render(
      <Provider store={configureStore(data)}>
        <Router>
          <Account />
        </Router>
      </Provider>
    );

  it("Snapshot test for Account component", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <Account />
        </Router>
      </Provider>
    );

    expect(asFragment(<Account />)).toMatchSnapshot();
  });

  it("Check addAdminEmail form works", () => {
    const { getByLabelText } = renderComponent(user_admin);

    const emailInput = getByLabelText("invoice_email");
    fireEvent.change(emailInput, { target: { value: "sm@gmail.com" } });
    expect(emailInput.value).toBe("sm@gmail.com");

    const AddAdminEmailForm = getByLabelText("addAdminEmail-form");
    fireEvent.submit(AddAdminEmailForm);
  });

  it("Check changeEmail form works", () => {
    const { getByLabelText } = renderComponent(user_admin);

    const emailInput = getByLabelText("email");
    fireEvent.change(emailInput, { target: { value: "sm@gmail.com" } });
    expect(emailInput.value).toBe("sm@gmail.com");

    const passwordInput = getByLabelText("password");
    fireEvent.change(passwordInput, { target: { value: "password1" } });
    expect(passwordInput.value).toBe("password1");

    const changeEmailForm = getByLabelText("changeEmail-form");
    fireEvent.submit(changeEmailForm);
  });

  it("Check changePassword form works", () => {
    const { getByLabelText } = renderComponent(user_admin);

    const oldPasswordInput = getByLabelText("old_password");
    fireEvent.change(oldPasswordInput, { target: { value: "old_password" } });
    expect(oldPasswordInput.value).toBe("old_password");

    const newPasswordInput = getByLabelText("new_password1");
    fireEvent.change(newPasswordInput, { target: { value: "new_password1" } });
    expect(newPasswordInput.value).toBe("new_password1");

    const changeEmailForm = getByLabelText("changePassword-form");
    fireEvent.submit(changeEmailForm);
  });

  it("Check deactivate form works", () => {
    const { getByLabelText } = renderComponent(user_admin);

    const changeEmailForm = getByLabelText("deactivate-form");
    fireEvent.submit(changeEmailForm);
  });
});
