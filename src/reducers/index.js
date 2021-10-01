import { combineReducers } from "redux";
import Auth from "./AuthReducers";
import Invoice from "./InvoiceReducers";
import Dashboard from "./DashboardReducer";
import Projects from "./ProjectsReducer";

const appReducer = combineReducers({ Auth, Invoice, Dashboard, Projects });

export default appReducer;
