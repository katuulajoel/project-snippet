/* eslint-disable no-unused-vars */
import { lazy } from "react";
import Payments from "../../pages/Dashboard/payments";
import Projects from "../../pages/Dashboard/projects";
import Tests from "../../pages/Dashboard/tests";
import Community from "../../pages/Dashboard/community";
import Settings from "../../pages/Dashboard/settings";
import Routing from "./Routing";

const Login = lazy(() => import("../../pages/AuthPages/Login"));
const SignUp = lazy(() => import("../../pages/AuthPages/Signup"));
const ForgotPassword = lazy(() =>
  import("../../pages/AuthPages/ForgotPassword")
);
const PasswordConfirm = lazy(() =>
  import("../../pages/AuthPages/PasswordResetConfirm")
);
const Dashboard = lazy(() =>
  import("../../pages/Dashboard/dashboard/Dashboard")
);

export const childRoutes = [
  {
    path: Routing.home.path,
    name: Routing.home.name,
    exact: true,
    component: Login,
  },
  {
    path: Routing.login.path,
    name: Routing.login.name,
    exact: false,
    component: Login,
  },
  {
    path: Routing.signup.path,
    name: Routing.signup.name,
    exact: false,
    component: SignUp,
  },
  {
    path: Routing.forgotPassword.path,
    name: Routing.forgotPassword.name,
    exact: false,
    component: ForgotPassword,
  },
  {
    path: Routing.resetPassword.path,
    name: Routing.resetPassword.name,
    exact: false,
    component: PasswordConfirm,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    exact: false,
    name: "dashboard",
  },
  {
    path: "/projects",
    component: Projects,
    exact: false,
    name: "projects",
  },
  {
    path: "/tests",
    component: Tests,
    exact: false,
    name: "Tests",
  },
  {
    path: "/community",
    component: Community,
    exact: false,
    name: "Community Guide",
  },
  {
    path: "/settings",
    component: Settings,
    exact: false,
    name: "settings",
  },
  {
    path: "/payments/:type",
    component: Payments,
    exact: false,
    name: "payments",
  },
];

export default childRoutes;
