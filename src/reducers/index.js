import { combineReducers } from "redux";
import Auth from "./AuthReducers";
import Invoice from "./InvoiceReducers";
import Dashboard from "./DashboardReducer";
import TestResults from "./TestResultsReducers";

const appReducer = combineReducers({ Auth, Invoice, Dashboard, TestResults });

export default appReducer;
