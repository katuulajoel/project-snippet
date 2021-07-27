/***
 * Created by Kazeem Olanipekun
 * This is where all route declaration is done and reference to when routing to different pages.
 */

export default {
  home: { path: "/", name: "Tunga" },
  userAgreement: { path: "/agreement", name: "User Agreement" },
  login: { path: "/login", name: "Log in", loc: "login" },
  signup: { path: "/signup", name: "Sign up", loc: "signup" },
  forgotPassword: { path: "/forgot-password", name: "Forgot Password" },
  resetPassword: {
    path: "/reset-password/confirm/:id/",
    name: "Reset Password",
  },
  dashboard: { path: "/dashboard", name: "Dashboard", loc: "dashboard" },
};
