import React from "react";
import { Provider } from "react-redux";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CookieSettingForm from "../modals/CookieSettingForm";
import store from "../../../../redux/store";
import { COOKIE_OPTIONS } from "../../../../components/utils/consent";

afterEach(cleanup);

describe("CookieSettingForm layout test", () => {
  let settings = {
    visibility: { location_details: 1, profile_visibility: 1, social_links: 1 },
    switches: {
      cookie_analytics_customization: true,
      cookie_performance_functionality: true,
      cookie_targeting_advertising: true,
      daily_update_email: true,
      direct_messages_email: true,
      event_email: true,
      friend_request_response_email: true,
      join_team_request_response_email: true,
      new_friend_request_email: true,
      new_task_application_email: true,
      new_task_email: true,
      new_task_invitation_email: true,
      new_task_progress_report_email: true,
      new_team_invitation_email: true,
      newsletter_email: true,
      payment_request_email: true,
      payment_update_email: true,
      task_activity_update_email: true,
      task_application_response_email: true,
      task_invitation_response_email: false,
      task_progress_report_reminder_email: false,
      task_survey_reminder_email: true,
      team_invitation_response_email: true,
    },
  };

  it("CookieSettingForm component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <CookieSettingForm onChange={jest.fn} />
        </Router>
      </Provider>
    );

    expect(asFragment(<CookieSettingForm />)).toMatchSnapshot();
  });

  it("Check checkboxes", async () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Router>
          <CookieSettingForm onChange={jest.fn} settings={settings} />
        </Router>
      </Provider>
    );

    for (let i = 0; i < COOKIE_OPTIONS.length; i++) {
      const element = COOKIE_OPTIONS[i];
      let check = getByLabelText(`check-${element.id}`);

      fireEvent.click(check);
      expect(check.checked).toEqual(false);
    }
  });
});
