import { combineReducers } from "redux";
import Auth from "./AuthReducers";
import Invoice from "./InvoiceReducers";
import Dashboard from "./DashboardReducer";
import Projects from "./ProjectsReducer";
import TestResults from "./TestResultsReducers";

const appReducer = combineReducers({ Auth, Invoice, Dashboard, Projects, TestResults });

export default appReducer;
