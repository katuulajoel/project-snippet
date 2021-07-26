import { lazy } from "react";
import Routing from "./Routing";

const Login = lazy(() => import("../pages/AuthPages/Login"));
const SignUp = lazy(() => import("../pages/AuthPages/Signup"));
const ForgotPassword = lazy(() => import("../pages/AuthPages/ForgotPassword"));
const PasswordConfirm = lazy(() =>
  import("../pages/AuthPages/PasswordResetConfirm")
);
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));

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
];

export default childRoutes;
