import React from "react";
import { Provider } from "react-redux";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Privacy from "../Privacy";
import { configureStore } from "../../../../redux/store";

afterEach(cleanup);

let user = (role) => {
  return {
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
        is_admin: false,
        username: "admin",
        first_name: "Admin",
        last_name: "Tunga",
        email: "admin2@tunga.io",
        is_staff: true,
        ...{ ...role },
      },
    },
    profile: {
      settings: {
        switches: {
          cookie_analytics_customization: true,
          cookie_performance_functionality: true,
          cookie_targeting_advertising: true,
          event_email: false,
          new_task_progress_report_email: false,
          newsletter_email: false,
          task_invitation_response_email: false,
          task_progress_report_reminder_email: false,
          task_survey_reminder_email: false,
        },
      },
    },
  };
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
    const { asFragment } = renderComponent({
      ...user({ is_developer: true }),
    });

    expect(asFragment(<Privacy />)).toMatchSnapshot();
  });

  it("Check Promotional Email Settings checkboxes", async () => {
    const { getByLabelText } = renderComponent({
      ...user({ is_developer: true }),
    });

    let label = [
      {
        name: "newsletter_email",
        label: "Email newsletters from Tunga",
      },
      {
        name: "event_email",
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
    const { getByLabelText } = renderComponent({
      ...user({
        is_developer: true,
        is_client_manager: true,
      }),
    });

    let label = [
      {
        name: "task_progress_report_reminder_email",
        label: "Email reminders about project progress updates.",
      },
      {
        name: "task_invitation_response_email",
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
    const { getByLabelText } = renderComponent({
      ...user({ is_admin: true, is_staff: true }),
    });

    let label = [
      {
        name: "task_survey_reminder_email",
        label: "Email reminders about client progress surveys.",
      },
      {
        name: "new_task_progress_report_email",
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
    const { getByLabelText } = renderComponent({
      ...user,
      ...{ is_developer: true },
    });

    const button = getByLabelText("submit");
    fireEvent.click(button);
    expect(getByLabelText("cookie-model")).toBeTruthy();
  });
});
