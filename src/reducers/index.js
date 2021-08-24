import { combineReducers } from "redux";
import Auth from "./AuthReducers";
import Invoice from "./InvoiceReducers";
import Dashboard from "./DashboardReducer";

const appReducer = combineReducers({ Auth, Invoice, Dashboard });

export default appReducer;
