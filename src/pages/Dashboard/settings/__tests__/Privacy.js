import React from "react";
import { Provider } from "react-redux";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Privacy from "../Privacy";
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

let user_dev = {
  Auth: {
    user: {
      id: 1,
      can_contribute: true,
      display_name: "Admin Tunga",
      display_type: "Client Manager",
      display_category: null,
      is_developer: true,
      is_designer: false,
      is_project_owner: false,
      is_client_manager: true,
      is_client_support_officer: false,
      is_admin: false,
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

describe("Privacy layout test", () => {
  const renderComponent = (data) =>
    render(
      <Provider store={configureStore(data)}>
        <Router>
          <Privacy />
        </Router>
      </Provider>
    );

  it("Privacy component snapshot", () => {
    const { asFragment } = renderComponent(user_dev);

    expect(asFragment(<Privacy />)).toMatchSnapshot();
  });

  it("Check Promotional Email Settings checkboxes", async () => {
    const { getByLabelText } = renderComponent(user_dev);

    let label = [
      {
        name: "NEWSLETTER_EMAIL",
        label: "Email newsletters from Tunga",
      },
      {
        name: "EVENT_EMAIL",
        label: "Emails about interesting events from Tunga",
      },
    ];

    for (let i = 0; i < label.length; i++) {
      const element = label[i];
      let check = getByLabelText(`check-${element.name}`);

      fireEvent.click(check);
      expect(check.checked).toEqual(true);
    }
  });

  it("Check Transactional Email Settings checkboxes", async () => {
    const { getByLabelText } = renderComponent(user_dev);

    let label = [
      {
        name: "TASK_PROGRESS_REPORT_REMINDER_EMAIL",
        label: "Email reminders about project progress updates.",
      },
      {
        name: "TASK_INVITATION_RESPONSE_EMAIL",
        label:
          "Email notifications about task invitation responses from developers.",
      },
    ];

    for (let i = 0; i < label.length; i++) {
      const element = label[i];
      let check = getByLabelText(`check-${element.name}`);

      fireEvent.click(check);
      expect(check.checked).toEqual(true);
    }
  });

  it("Check Transactional Email Settings checkboxes, user is not a dev or project manager", async () => {
    const { getByLabelText } = renderComponent(user_admin);

    let label = [
      {
        name: "TASK_SURVEY_REMINDER_EMAIL",
        label: "Email reminders about client progress surveys.",
      },
      {
        name: "NEW_TASK_PROGRESS_REPORT_EMAIL",
        label: "Email notifications about new developer progress reports.",
      },
    ];

    for (let i = 0; i < label.length; i++) {
      const element = label[i];
      let check = getByLabelText(`check-${element.name}`);

      fireEvent.click(check);
      expect(check.checked).toEqual(true);
    }
  });

  it("Check open modal", async () => {
    const { getByLabelText } = renderComponent(user_dev);

    const button = getByLabelText("submit");
    fireEvent.click(button);
    expect(getByLabelText("cookie-model")).toBeTruthy();
  });
});
