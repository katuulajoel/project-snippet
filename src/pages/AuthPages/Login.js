import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import { authenticate } from "../../actions/AuthActions";
import Progress from "../../components/Progress";
import Error from "../../components/Error";
import MetaTags from "../../components/MetaTags";

import Button from "../../components/Button";
import AuthLayout, {
  AuthStylingLayoutChildren,
} from "../../layouts/AuthLayout";

import Input from "../../components/core/input/index";
import querystring from "querystring";
import { Cta } from "../../components/Form/Form";
const Login = (props) => {
  const { authenticate, auth } = props;
  const history = useHistory();

  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      return;
    }
    authenticate({ username, password });
  };

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
          <div>
            <form onSubmit={onFormSubmit}>
              {auth.errors &&
                auth.errors.auth &&
                auth.errors.auth.non_field_errors && (
                  <Error
                    message={
                      auth.errors.auth.non_field_errors.join(", ") ||
                      "Sorry, we couldn't log you in. Please try again."
                    }
                  />
                )}
              <div className="AuthForm__title">
                {queryParams && queryParams.deactivated ? (
                  <div className="alert alert-danger">
                    Your account has been deactivated
                  </div>
                ) : (
                  "Welcome back"
                )}
              </div>
              {auth.isAuthenticating.isLoginStart && <Progress />}
              <div className="form-group">
                <label className="Auth_label">
                  Email address or Username
                  <span>*</span>
                </label>
                <Input
                  label=""
                  type="email"
                  className="form-control"
                  name="username"
                  value={username || ""}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter email address or username"
                  required
                />
              </div>
              <div className="form-group">
                <label className="Auth_label">
                  Password
                  <span>*</span>
                  <Cta style={{ margin: "0 0 0 auto" }} href="/forgot-password">
                    Forgot password?
                  </Cta>
                </label>
                <Input
                  label=""
                  type="password"
                  className="form-control"
                  name="password"
                  value={password || ""}
                  onChange={(e) => setPassword(e.target.value)}
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
};

Login.propTypes = {
  auth: PropTypes.object,
  isAuthenticated: PropTypes.func,
  authenticate: PropTypes.func,
  confirmationKey: PropTypes.string,
  invitationKey: PropTypes.string,
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
