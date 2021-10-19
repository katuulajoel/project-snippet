import { combineReducers } from "redux";
import Auth from "./AuthReducers";
import invites from "./InvitesReducer";
import Invoice from "./InvoiceReducers";
import Dashboard from "./DashboardReducer";
import Projects from "./ProjectsReducer";
import TestResults from "./TestResultsReducers";
import User from "./UserReducers";
import Skill from "./SkillReducers";
import profile from "./ProfileReducer";

const appReducer = combineReducers({
  Auth,
  User,
  invites,
  Invoice,
  Dashboard,
  Projects,
  TestResults,
  Skill,
  profile,
});

export default appReducer;
