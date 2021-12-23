// Dashboard action types
export const FETCH_NOTIFICATIONS_START = "FETCH_NOTIFICATIONS_START";
export const FETCH_NOTIFICATIONS_SUCCESS = "FETCH_NOTIFICATIONS_SUCCESS";
export const FETCH_NOTIFICATIONS_FAILED = "FETCH_NOTIFICATIONS_FAILED";
export const DELETE_NOTIFICATIONS_START = "DELETE_NOTIFICATIONS_START";
export const DELETE_NOTIFICATIONS_SUCCESS = "DELETE_NOTIFICATIONS_SUCCESS";
export const DELETE_NOTIFICATIONS_FAILED = "DELETE_NOTIFICATIONS_FAILED";
export const CREATE_NOTIFICATION_LOG_START = "CREATE_NOTIFICATION_LOG_START";
export const CREATE_NOTIFICATION_LOG_SUCCESS =
  "CREATE_NOTIFICATION_LOG_SUCCESS";
export const CREATE_NOTIFICATION_LOG_FAILED = "CREATE_NOTIFICATION_LOG_FAILED";

// Invoices action types
export const CREATE_INVOICE_START = "CREATE_INVOICE_START";
export const CREATE_INVOICE_SUCCESS = "CREATE_INVOICE_SUCCESS";
export const CREATE_INVOICE_FAILED = "CREATE_INVOICE_FAILED";
export const CREATE_INVOICE_BATCH_START = "CREATE_INVOICE_BATCH_START";
export const CREATE_INVOICE_BATCH_SUCCESS = "CREATE_INVOICE_BATCH_SUCCESS";
export const CREATE_INVOICE_BATCH_FAILED = "CREATE_INVOICE_BATCH_FAILED";
export const LIST_INVOICES_START = "LIST_INVOICES_START";
export const LIST_INVOICES_SUCCESS = "LIST_INVOICES_SUCCESS";
export const LIST_INVOICES_FAILED = "LIST_INVOICES_FAILED";
export const SEARCH_INVOICES_START = "SEARCH_INVOICES_START";
export const SEARCH_INVOICES_SUCCESS = "SEARCH_INVOICES_SUCCESS";
export const SEARCH_INVOICES_FAILED = "SEARCH_INVOICES_FAILED";
export const RETRIEVE_INVOICE_START = "RETRIEVE_INVOICE_START";
export const RETRIEVE_INVOICE_SUCCESS = "RETRIEVE_INVOICE_SUCCESS";
export const RETRIEVE_INVOICE_FAILED = "RETRIEVE_INVOICE_FAILED";
export const UPDATE_INVOICE_START = "UPDATE_INVOICE_START";
export const UPDATE_INVOICE_SUCCESS = "UPDATE_INVOICE_SUCCESS";
export const UPDATE_INVOICE_FAILED = "UPDATE_INVOICE_FAILED";
export const LIST_MORE_INVOICES_START = "LIST_MORE_INVOICES_START";
export const LIST_MORE_INVOICES_SUCCESS = "LIST_MORE_INVOICES_SUCCESS";
export const LIST_MORE_INVOICES_FAILED = "LIST_MORE_INVOICES_FAILED";
export const SEARCH_MORE_INVOICES_START = "SEARCH_MORE_INVOICES_START";
export const SEARCH_MORE_INVOICES_SUCCESS = "SEARCH_MORE_INVOICES_SUCCESS";
export const SEARCH_MORE_INVOICES_FAILED = "SEARCH_MORE_INVOICES_FAILED";
export const DELETE_INVOICE_START = "DELETE_INVOICE_START";
export const DELETE_INVOICE_SUCCESS = "DELETE_INVOICE_SUCCESS";
export const DELETE_INVOICE_FAILED = "DELETE_INVOICE_FAILED";
export const PAY_INVOICE_START = "PAY_INVOICE_START";
export const PAY_INVOICE_SUCCESS = "PAY_INVOICE_SUCCESS";
export const PAY_INVOICE_FAILED = "PAY_INVOICE_FAILED";
export const ARCHIVE_INVOICE_SUCCESS = "ARCHIVE_INVOICE_SUCCESS";
export const ARCHIVE_INVOICE_START = "ARCHIVE_INVOICE_START";
export const ARCHIVE_INVOICE_FAILED = "ARCHIVE_INVOICE_FAILED";
export const GENERATE_INVOICE_SUCCESS = "GENERATE_INVOICE_SUCCESS";
export const GENERATE_INVOICE_START = "GENERATE_INVOICE_START";
export const GENERATE_INVOICE_FAILED = "GENERATE_INVOICE_FAILED";
export const BULK_ACTION_START = "BULK_ACTION_START";
export const BULK_ACTION_FAILED = "BULK_ACTION_FAILED";
export const BULK_ACTION_SUCCESS = "BULK_ACTION_SUCCESS";
export const DOWNLOAD_INVOICE_CSV_STARTED = "DOWNLOAD_INVOICE_CSV_STARTED";
export const DOWNLOAD_INVOICE_CSV_FAILED = "DOWNLOAD_INVOICE_CSV_FAILED";
export const DOWNLOAD_INVOICE_CSV_SUCCESS = "DOWNLOAD_INVOICE_CSV_SUCCESS";
export const INVOICE_SUMMARY_START = "INVOICE_SUMMARY_START";
export const INVOICE_SUMMARY_SUCCESS = "INVOICE_SUMMARY_SUCCESS";
export const INVOICE_SUMMARY_FAILED = "INVOICE_SUMMARY_FAILED";
export const SEARCH_PROJECTS_START = "SEARCH_PROJECTS_START";
export const SEARCH_PROJECTS_SUCCESS = "SEARCH_PROJECTS_SUCCESS";
export const SEARCH_PROJECTS_FAILED = "SEARCH_PROJECTS_FAILED";
export const SEARCH_MORE_PROJECTS_START = "SEARCH_MORE_PROJECTS_START";
export const SEARCH_MORE_PROJECTS_SUCCESS = "SEARCH_MORE_PROJECTS_SUCCESS";
export const SEARCH_MORE_PROJECTS_FAILED = "SEARCH_MORE_PROJECTS_FAILED";

// Projects Actions types
export const TOGGLE_PROJECT_FILTER = "TOGGLE_PROJECT_FILTER";
export const FETCH_PROJECT_START = "FETCH_PROJECT_START";
export const FETCH_PROJECT_SUCCESS = "FETCH_PROJECT_SUCCESS";
export const FETCH_PROJECT_FAILED = "FETCH_PROJECT_FAILED";
export const FETCH_PROJECTS_START = "FETCH_PROJECTS_START";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_PROJECTS_FAILED = "FETCH_PROJECTS_FAILED";
export const FETCH_MORE_PROJECTS_START = "FETCH_MORE_PROJECTS_START";
export const FETCH_MORE_PROJECTS_SUCCESS = "FETCH_MORE_PROJECTS_SUCCESS";
export const FETCH_MORE_PROJECTS_FAILED = "FETCH_MORE_PROJECTS_FAILED";
export const UPDATE_PROJECT_START = "UPDATE_PROJECT_START";
export const UPDATE_PROJECT_SUCCESS = "UPDATE_PROJECT_SUCCESS";
export const UPDATE_PROJECT_FAILED = "UPDATE_PROJECT_FAILED";
export const CREATE_PROGRESS_EVENT_START = "CREATE_PROGRESS_EVENT_START";
export const CREATE_PROGRESS_EVENT_SUCCESS = "CREATE_PROGRESS_EVENT_SUCCESS";
export const CREATE_PROGRESS_EVENT_FAILED = "CREATE_PROGRESS_EVENT_FAILED";
export const UPDATE_PROGRESS_EVENT_START = "UPDATE_PROGRESS_EVENT_START";
export const UPDATE_PROGRESS_EVENT_SUCCESS = "UPDATE_PROGRESS_EVENT_SUCCESS";
export const UPDATE_PROGRESS_EVENT_FAILED = "UPDATE_PROGRESS_EVENT_FAILED";
export const CREATE_DOCUMENT_START = "CREATE_DOCUMENT_START";
export const CREATE_DOCUMENT_SUCCESS = "CREATE_DOCUMENT_SUCCESS";
export const CREATE_DOCUMENT_FAILED = "CREATE_DOCUMENT_FAILED";
export const UPDATE_DOCUMENT_START = "UPDATE_DOCUMENT_START";
export const UPDATE_DOCUMENT_SUCCESS = "UPDATE_DOCUMENT_SUCCESS";
export const UPDATE_DOCUMENT_FAILED = "UPDATE_DOCUMENT_FAILED";
export const DELETE_DOCUMENT_START = "DELETE_DOCUMENT_START";
export const DELETE_DOCUMENT_SUCCESS = "DELETE_DOCUMENT_SUCCESS";
export const DELETE_DOCUMENT_FAILED = "DELETE_DOCUMENT_FAILED";
export const LIST_TIMESHEETS_START = "LIST_TIMESHEETS_START";
export const LIST_TIMESHEETS_SUCCESS = "LIST_TIMESHEETS_SUCCESS";
export const LIST_TIMESHEETS_FAILED = "LIST_TIMESHEETS_FAILED";
export const CREATE_TIMESHEET_START = "CREATE_TIMESHEET_START";
export const CREATE_TIMESHEET_SUCCESS = "CREATE_TIMESHEET_SUCCESS";
export const CREATE_TIMESHEET_FAILED = "CREATE_TIMESHEET_FAILED";

// Test action types
export const CREATE_RESULT_START = "CREATE_RESULT_START";
export const CREATE_RESULT_SUCCESS = "CREATE_RESULT_SUCCESS";
export const CREATE_RESULT_FAILED = "CREATE_RESULT_FAILED";
export const UPDATE_RESULT_START = "UPDATE_RESULT_START";
export const UPDATE_RESULT_SUCCESS = "UPDATE_RESULT_SUCCESS";
export const UPDATE_RESULT_FAILED = "UPDATE_RESULT_FAILED";
export const FETCH_RESULT_START = "FETCH_RESULT_START";
export const FETCH_RESULT_SUCCESS = "FETCH_RESULT_SUCCESS";
export const FETCH_RESULT_FAILED = "FETCH_RESULT_FAILED";
export const DELETE_RESULT_START = "DELETE_RESULT_START";
export const DELETE_RESULT_SUCCESS = "DELETE_RESULT_SUCCESS";
export const DELETE_RESULT_FAILED = "DELETE_RESULT_FAILED";
export const LIST_MORE_RESULTS_START = "LIST_MORE_RESULTS_START";
export const LIST_MORE_RESULTS_SUCCESS = "LIST_MORE_RESULTS_SUCCESS";
export const LIST_MORE_RESULTS_FAILED = "LIST_MORE_RESULTS_FAILED";
export const SET_FILTERS = "SET_FILTERS";

// Skills action types
export const GET_SKILLS_START = "GET_SKILLS_START";
export const GET_SKILLS_SUCCESS = "GET_SKILLS_SUCCESS";
export const GET_SKILLS_FAILED = "GET_SKILLS_FAILED";

// Utility action types
export const TOGGLE_RIGHT_NAV = "TOGGLE_RIGHT_NAV";
export const SET_PENDING_INVITES = "SET_PENDING_INVITES";
export const SET_MORE_PENDING_INVITES = "SET_MORE_PENDING_INVITES";
export const DELETE_PENDING_INVITE = "DELETE_PENDING_INVITE";

// Profile Actions
export const SET_USER_PROFILE = "SET_USER_PROFILE";
export const SET_USER_SETTINGS = "SET_USER_SETTINGS";

// Buttons
export const SET_BUTTON = "SET_BUTTON";
