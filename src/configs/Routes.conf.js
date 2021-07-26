import { lazy } from "react";
import CreateLayout from "../layouts/CreateLayout";
import ReportCreateLayout from "../layouts/ReportCreateLayout";
import Account from "../pages/Dashboard/settings/Account";
import CompanyDetails from "../pages/Dashboard/settings/CompanyDetails";
import CompanyProfile from "../pages/Dashboard/settings/CompanyProfile";
import Experience from "../pages/Dashboard/settings/Experience";
import Payment from "../pages/Dashboard/settings/Payment";
import Privacy from "../pages/Dashboard/settings/Privacy";
import Profile from "../pages/Dashboard/settings/Profile";
import Routing from "./Routing";

const Login = lazy(() =>
  import("../pages/AuthPages/Login/LoginForm/LoginForm")
);
const SignUp = lazy(() => import("../pages/AuthPages/Signup/Signup"));
const ForgotPassword = lazy(() =>
  import(
    "../pages/AuthPages/ForgotPassword/ForgotPasswordForm/ForgotPasswordForm"
  )
);
const PasswordConfirm = lazy(() =>
  import("../pages/AuthPages/PasswordConfirm/PasswordResetConfirm")
);
const Dashboard = lazy(() => import("../components/Dashboard"));

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
    component: CreateLayout,
    exact: true,
    name: "projects",
  },
  {
    path: "/projects/reports",
    component: ReportCreateLayout,
    exact: true,
    name: "payments",
  },
  {
    path: "/settings/account",
    component: Account,
    exact: false,
    name: "settings",
  },
  {
    path: "/settings/company-details",
    component: CompanyDetails,
    exact: false,
    name: "settings",
  },
  {
    path: "/settings/company-profile",
    component: CompanyProfile,
    exact: false,
    name: "settings",
  },
  {
    path: "/settings/experience",
    component: Experience,
    exact: false,
    name: "settings",
  },
  {
    path: "/settings/payment",
    component: Payment,
    exact: false,
    name: "settings",
  },
  {
    path: "/settings/privacy",
    component: Privacy,
    exact: false,
    name: "settings",
  },
  {
    path: "/settings/profile",
    component: Profile,
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
