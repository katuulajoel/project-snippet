/* eslint-disable react/prop-types */
/* eslint-disable react/no-string-refs */
import React from "react";
import { connect } from "react-redux";

import { authenticate } from "../../../../actions/AuthActions";
import Progress from "../../../../components/core/Progress";
import Error from "../../../../components/core/Error";
// import Success from "../../components/core/Success";
// import FieldError from "../../components/core/FieldError";
import MetaTags from "../../../../components/core/MetaTags";

import PropTypes from "prop-types";
import Button from "../../../../components/Button";
import AuthLayout, {
  AuthStylingLayoutChildren,
} from "../../../../layouts/AuthLayout";

import Input from "../../../../components/input/index";
import querystring from "querystring";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      formSubmitted: false,
    };
  }

  static propTypes = {
    confirmationKey: PropTypes.string,
    invitationKey: PropTypes.string,
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ formSubmitted: true });
    if (!this.state.username || !this.state.password) {
      return;
    }

    this.props.authenticate(this.state);
  };
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      formSubmitted: false,
    });
  };

  render() {
    const { auth, history } = this.props;
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }

    const queryParams = querystring.parse(
      (window.location.search || "").replace("?", "")
    );

    return (
      <div className="auth-page">
        <MetaTags
          title={"Login"}
          description={
            "Login to hire skilled African developers ready work on your software project."
          }
        />

        <AuthLayout>
          <AuthStylingLayoutChildren>
            <h3>Login</h3>
            <div className="auth-form-wrapper p-0 m-0 w-100">
              <form
                onSubmit={this.onFormSubmit}
                name="login"
                role="form"
                ref="login_form"
              >
                {auth.errors &&
                auth.errors.auth &&
                auth.errors.auth.non_field_errors ? (
                  <Error
                    message={
                      auth.errors.auth.non_field_errors.join(", ") ||
                      "Sorry, we couldn't log you in. Please try again."
                    }
                  />
                ) : null}
                <p className="AuthForm__title">
                  {queryParams && queryParams.deactivated ? (
                    <div className="alert alert-danger">
                      Your account has been deactivated
                    </div>
                  ) : (
                    "Welcome back"
                  )}
                </p>
                {auth.isAuthenticating.isLoginStart ? <Progress /> : ""}
                <div className="form-group">
                  <label>
                    Email address or Username
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
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                    placeholder="Enter email address or username"
                    required
                  />
                </div>
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
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    placeholder="Enter password"
                    required
                  />
                </div>
                <div className="text-center">
                  <Button type="submit">Login</Button>
                </div>
              </form>
            </div>
          </AuthStylingLayoutChildren>
        </AuthLayout>
      </div>
    );
  }
}
Login.propTypes = {
  auth: PropTypes.object,
  isAuthenticated: PropTypes.func,
  authenticate: PropTypes.func,
};

const mapStateToProps = (store) => ({
  auth: store.Auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    authenticate: (credentials) => dispatch(authenticate(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
