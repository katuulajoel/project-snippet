import { combineReducers } from "redux";
import AuthReducers from "./AuthReducers";

const appReducer = combineReducers({ Auth: AuthReducers });

export default appReducer;
