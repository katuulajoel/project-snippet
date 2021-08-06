import React, { useRef } from "react";
import { useSelector } from "react-redux";

import Progress from "../../components/Progress";
import Error from "../../components/Error";
import Success from "../../components/Success";
import FieldError from "../../components/FieldError";
import MetaTags from "../../components/MetaTags";

import PropTypes from "prop-types";
import Button from "../../components/Button";
import AuthLayout, {
  AuthStylingLayoutChildren,
} from "../../layouts/AuthLayout";

import Input from "../../components/Input";
const SignUp = (props) => {
  const { confirmationKey, invitationKey } = props;

  const formEl = useRef(null);

  const Auth = useSelector(({ Auth }) => Auth);
  const { application, invitation } = Auth;

  let is_applying_developer = !!confirmationKey,
    is_invited_user = !!invitationKey,
    is_pre_approved = is_applying_developer || is_invited_user;

  return (
    <div className="auth-page">
      <MetaTags
        title={"Sign Up"}
        description={
          "Sign Up to hire skilled African developers ready work on your software project."
        }
      />

      <AuthLayout>
        <AuthStylingLayoutChildren>
          <h3>Create account</h3>
          <p className="intro__text">Enter your details to get started</p>
          <div className="auth-form-wrapper p-0 m-0 w-100">
            {(Auth.isRetrievingApplication && is_applying_developer) ||
            (Auth.isRetrievingInvitation && is_invited_user) ? (
              <Progress />
            ) : is_pre_approved && !application.id && !invitation.id ? (
              <Error message="Oops! We couldn't find your invite." />
            ) : (
              <form onSubmit={() => {}} name="signup" role="form" ref={formEl}>
                {Auth.isRegistering && <Progress />}

                {Auth.isRegistered && (
                  <Success
                    message={`Your account has been created successfully. ${
                      is_pre_approved
                        ? ""
                        : "Please check your e-mail for further instructions."
                    }`}
                  />
                )}
                {Auth.error.register && (
                  <Error
                    message={
                      Auth.error.register.non_field_errors ||
                      "Please correct the errors below"
                    }
                  />
                )}

                {is_pre_approved && (
                  <div>
                    {is_applying_developer && (
                      <p>
                        Name: <strong>{application.display_name}</strong>
                      </p>
                    )}

                    <div className="form-group">
                      <label className="Auth_label">
                        Email address
                        <span>*</span>
                      </label>
                      <Input
                        label=""
                        type="email"
                        className="form-control"
                        value={application.email || invitation.email}
                        disabled={true}
                        aria-disabled={true}
                        placeholder="Email"
                      />
                    </div>
                  </div>
                )}
                {Auth.error.register && Auth.error.register.username ? (
                  <FieldError message={Auth.error.register.username} />
                ) : null}
                <div className="form-group">
                  <label className="Auth_label">
                    Username
                    <span>*</span>
                  </label>
                  <Input
                    label=""
                    type="text"
                    className="form-control"
                    id="username"
                    required
                    placeholder="Username"
                  />
                </div>

                {is_applying_developer ? null : (
                  <div className="row">
                    <div className="col-md-6">
                      {Auth.error.register && Auth.error.register.first_name ? (
                        <FieldError message={Auth.error.register.first_name} />
                      ) : null}
                      <div className="form-group">
                        <label className="Auth_label">
                          First name
                          <span>*</span>
                        </label>
                        <Input
                          label=""
                          type="text"
                          className="form-control"
                          id="fname"
                          required
                          placeholder="First name"
                          defaultValue={invitation?.first_name || ""}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      {Auth.error.register && Auth.error.register.last_name ? (
                        <FieldError message={Auth.error.register.last_name} />
                      ) : null}
                      <div className="form-group">
                        <label className="Auth_label">
                          Last name
                          <span>*</span>
                        </label>
                        <Input
                          label=""
                          type="text"
                          className="form-control"
                          id="lname"
                          required
                          placeholder="Last name"
                          defaultValue={invitation?.last_name || ""}
                        />
                      </div>
                    </div>

                    {Auth.error.register && Auth.error.register.email ? (
                      <FieldError message={Auth.error.register.email} />
                    ) : null}
                    {is_invited_user ? null : (
                      <div className="form-group">
                        <label className="Auth_label">
                          Email Address
                          <span>*</span>
                        </label>
                        <Input
                          label=""
                          type="email"
                          className="form-control"
                          id="email"
                          required
                          placeholder="Email"
                        />
                      </div>
                    )}
                  </div>
                )}

                {Auth.error.register && Auth.error.register.password1 ? (
                  <FieldError message={Auth.error.register.password1} />
                ) : null}
                <div className="form-group">
                  <label className="Auth_label">
                    Password
                    <span>*</span>
                  </label>
                  <Input
                    label=""
                    type="password"
                    className="form-control"
                    id="pwd"
                    required
                    placeholder="Password"
                  />
                </div>

                {Auth.error.register && Auth.error.register.password2 ? (
                  <FieldError message={Auth.error.register.password2} />
                ) : null}
                <div className="form-group">
                  <label className="Auth_label">
                    Confirm Password
                    <span>*</span>
                  </label>
                  <Input
                    type="password"
                    className="form-control"
                    label=""
                    id="pwd-confirm"
                    required
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="text-center">
                  <Button type="submit" disabled={Auth.isRegistering}>
                    Sign up
                  </Button>
                </div>
              </form>
            )}
          </div>
        </AuthStylingLayoutChildren>
      </AuthLayout>
    </div>
  );
};

SignUp.defaultProps = {
  confirmationKey: null,
  invitationKey: null,
};

SignUp.propTypes = {
  confirmationKey: PropTypes.string,
  invitationKey: PropTypes.string,
};

export default SignUp;
