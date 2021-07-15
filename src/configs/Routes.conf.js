import { lazy } from "react";
import Routing from "./Routing";

const Login = lazy(() =>
  import("../pages/AuthPages/Login/LoginForm/LoginForm")
);
const SignUp = lazy(() => import("../pages/AuthPages/Signup/Signup"));
// const UserAgreement = lazy(() => import("../UserAgreement/UserAgreement"));
const ForgotPassword = lazy(() =>
  import(
    "../pages/AuthPages/ForgotPassword/ForgotPasswordForm/ForgotPasswordForm"
  )
);
const PasswordConfirm = lazy(() =>
  import("../pages/AuthPages/PasswordConfirm/PasswordResetConfirm")
);
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
// const Home = lazy(() => import("../home/Home"));

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
  // {
  //   path: Routing.userAgreement.path,
  //   name: Routing.userAgreement.name,
  //   exact: false,
  //   component: UserAgreement,
  // },
  {
    path: "/dashboard",
    component: Dashboard,
    exact: false,
    name: "dashboard",
  },
  {
    path: "/projects",
    component: Dashboard,
    exact: false,
    name: "projects",
  },
  {
    path: "/payments",
    component: Dashboard,
    exact: false,
    name: "payments",
  },
  {
    path: "/settings",
    component: Dashboard,
    exact: false,
    name: "settings",
  },
  {
    path: "/onboard",
    component: Dashboard,
    exact: false,
    name: "onboard",
  },
];

const Routes = [
  // {
  //   path: "",
  //   component: Home,
  //   exact: true,
  //   name: Routing.home.name,
  //   childRoutes,
  // },
];

export default Routes;
