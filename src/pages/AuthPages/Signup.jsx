/* eslint-disable react/prop-types */
/* eslint-disable react/no-string-refs */
import React from "react";

import Progress from "../../components/Progress";
import Error from "../../components/Error";
import Success from "../../components/Success";
import FieldError from "../../components/FieldError";
import MetaTags from "../../components/MetaTags";

import {
  USER_TYPE_DEVELOPER,
  USER_TYPE_PROJECT_OWNER,
} from "../../actions/utils/api";
import PropTypes from "prop-types";
import Button from "../../components/Button";
import AuthLayout, {
  AuthStylingLayoutChildren,
} from "../../layouts/AuthLayout";

import Input from "../../../components/input/index";
import connect from "../../connectors/AuthConnector";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.password2 = React.createRef();
  }

  static defaultProps = {
    confirmationKey: null,
    invitationKey: null,
  };

  static propTypes = {
    confirmationKey: PropTypes.string,
    invitationKey: PropTypes.string,
  };

  componentDidMount() {
    let confirmationKey = this.props.confirmationKey;
    if (confirmationKey) {
      this.props.AuthActions.retrieveApplication(confirmationKey);
    }

    let invitationKey = this.props.invitationKey;
    if (invitationKey) {
      this.props.retrieveInvite(invitationKey);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.Auth.isRegistered && !prevProps.Auth.isRegistered) {
      this.refs.signup_form.reset();
      if (this.props.confirmationKey || this.props.invitationKey) {
        this.props.AuthActions.verify();
      }
    }
  }

  onSignUp(e) {
    e.preventDefault();

    const { Auth } = this.props;
    const { application, invitation } = Auth;

    let confirmationKey = this.props.confirmationKey,
      invitationKey = this.props.invitationKey;
    let username = this.refs.username.value.trim(),
      first_name = null,
      last_name = null,
      email = null;

    if (confirmationKey) {
      first_name = application.first_name;
      last_name = application.last_name;
      email = application.email;
    } else {
      first_name = this.refs.first_name.value.trim();
      last_name = this.refs.last_name.value.trim();

      if (invitationKey) {
        email = invitation.email;
      } else {
        email = this.refs.email.value.trim();
      }
    }

    let password1 = this.refs.password1.value.trim(),
      password2 = this.refs.password2.value.trim(),
      user_type =
        confirmationKey || invitationKey
          ? USER_TYPE_DEVELOPER
          : USER_TYPE_PROJECT_OWNER;

    this.props.AuthActions.register({
      username,
      email,
      password1,
      password2,
      first_name,
      last_name,
      type: user_type,
      key: confirmationKey,
      invite_key: invitationKey,
    });
  }

  render() {
    const { Auth } = this.props;
    const { application, invitation } = Auth;

    let confirmationKey = this.props.confirmationKey,
      invitationKey = this.props.invitationKey,
      is_applying_developer = !!confirmationKey,
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
                <form
                  onSubmit={this.onSignUp.bind(this)}
                  name="signup"
                  role="form"
                  ref="signup_form"
                >
                  {Auth.isRegistering ? <Progress /> : null}

                  {Auth.isRegistered ? (
                    <Success
                      message={`Your account has been created successfully. ${
                        is_pre_approved
                          ? ""
                          : "Please check your e-mail for further instructions."
                      }`}
                    />
                  ) : null}
                  {Auth.error.register ? (
                    <Error
                      message={
                        Auth.error.register.non_field_errors ||
                        "Please correct the errors below"
                      }
                    />
                  ) : null}

                  {is_pre_approved ? (
                    <div>
                      {is_applying_developer ? (
                        <p>
                          Name: <strong>{application.display_name}</strong>
                        </p>
                      ) : null}

                      <div className="form-group">
                        <label>
                          Email address
                          <span
                            style={{
                              color: "#da3451",
                              paddingLeft: "2px",
                            }}
                          >
                            *
                          </span>
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
                  ) : null}
                  {Auth.error.register && Auth.error.register.username ? (
                    <FieldError message={Auth.error.register.username} />
                  ) : null}
                  <div className="form-group">
                    <label>
                      Username
                      <span
                        style={{
                          color: "#da3451",
                          paddingLeft: "2px",
                        }}
                      >
                        *
                      </span>
                    </label>
                    <Input
                      label=""
                      type="text"
                      className="form-control"
                      id="username"
                      ref="username"
                      required
                      placeholder="Username"
                    />
                  </div>

                  {is_applying_developer ? null : (
                    <div className="row">
                      <div className="col-md-6">
                        {Auth.error.register &&
                        Auth.error.register.first_name ? (
                          <FieldError
                            message={Auth.error.register.first_name}
                          />
                        ) : null}
                        <div className="form-group">
                          <label>
                            First name
                            <span
                              style={{
                                color: "#da3451",
                                paddingLeft: "2px",
                              }}
                            >
                              *
                            </span>
                          </label>
                          <Input
                            label=""
                            type="text"
                            className="form-control"
                            id="fname"
                            ref="first_name"
                            required
                            placeholder="First name"
                            defaultValue={invitation?.first_name || ""}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        {Auth.error.register &&
                        Auth.error.register.last_name ? (
                          <FieldError message={Auth.error.register.last_name} />
                        ) : null}
                        <div className="form-group">
                          <label>
                            Last name
                            <span
                              style={{
                                color: "#da3451",
                                paddingLeft: "2px",
                              }}
                            >
                              *
                            </span>
                          </label>
                          <Input
                            label=""
                            type="text"
                            className="form-control"
                            id="lname"
                            ref="last_name"
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
                          <label>
                            Email Address
                            <span
                              style={{
                                color: "#da3451",
                                paddingLeft: "2px",
                              }}
                            >
                              *
                            </span>
                          </label>
                          <Input
                            label=""
                            type="email"
                            className="form-control"
                            id="email"
                            ref="email"
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
                    <label>
                      Password
                      <span
                        style={{
                          color: "#da3451",
                          paddingLeft: "2px",
                        }}
                      >
                        *
                      </span>
                    </label>
                    <Input
                      label=""
                      type="password"
                      className="form-control"
                      id="pwd"
                      ref="password1"
                      required
                      placeholder="Password"
                    />
                  </div>

                  {Auth.error.register && Auth.error.register.password2 ? (
                    <FieldError message={Auth.error.register.password2} />
                  ) : null}
                  <div className="form-group">
                    <label>
                      Confirm Password
                      <span
                        style={{
                          color: "#da3451",
                          paddingLeft: "2px",
                        }}
                      >
                        *
                      </span>
                    </label>
                    <Input
                      type="password"
                      className="form-control"
                      label=""
                      id="pwd-confirm"
                      ref="password2"
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
  }
}

export default connect(SignUp);
