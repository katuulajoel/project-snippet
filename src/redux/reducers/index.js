import { combineReducers } from "redux";
import Auth from "./AuthReducers";
import invites from "./InvitesReducer";
import Invoice from "./InvoiceReducers";
import Dashboard from "./DashboardReducer";
import Projects from "./ProjectsReducer";
import profile from "./ProfileReducer";

const appReducer = combineReducers({
  Auth,
  invites,
  Invoice,
  Dashboard,
  Projects,
  profile,
});

export default appReducer;
