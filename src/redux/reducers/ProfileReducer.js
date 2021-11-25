import * as actionTypes from "../../configs/constants/ActionTypes";
let r = {
  visibility: { location_details: 1, profile_visibility: 1, social_links: 1 },
  switches: {
    cookie_analytics_customization: true,
    cookie_performance_functionality: false,
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
function profile(state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_USER_PROFILE:
      return { ...state, ...action.data };
    case actionTypes.SET_USER_SETTINGS:
      return { ...state, settings: { ...action.data, ...r } };
    default:
      return state;
  }
}

export default profile;
