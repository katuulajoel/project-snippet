import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers";
import Invoice from "./InvoiceReducers";

const appReducer = combineReducers({ Auth: AuthReducers, Invoice });

export default appReducer;
