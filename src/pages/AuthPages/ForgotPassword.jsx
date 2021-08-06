import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Cta } from "../../components/Form/Form";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Error from "../../components/Error";
import { resetPassword } from "../../actions/AuthActions";
import Progress from "../../components/Progress";
import Success from "../../components/Success";
import MetaTags from "../../components/MetaTags";
import AuthLayout, {
  AuthStylingLayoutChildren,
} from "../../layouts/AuthLayout";

const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useSelector(({ Auth }) => Auth);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/dashboard");
    }
  }, []);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      return;
    }

    dispatch(resetPassword({ email }));
  };

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
          <div>
            <form onSubmit={onFormSubmit} name="login" role="form">
              {auth.errors &&
                auth.errors.auth &&
                auth.errors.auth.non_field_errors && (
                  <Error
                    message={
                      auth.errors.auth.non_field_errors.join(", ") ||
                      "Sorry, we couldn't reset your password. Please try again."
                    }
                  />
                )}
              <h3 className="AuthForm__title">Reset Password</h3>
              {auth.isResetting && <Progress />}
              {auth.isReset && (
                <Success message="Instructions for resetting your password have been sent to your email if we find an account associated with it." />
              )}
              <div className="form-group">
                <label className="Auth_label">
                  Email address
                  <span>*</span>
                </label>
                <Input
                  label=""
                  type="email"
                  id="email"
                  className="form-control"
                  name="email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
              <Cta
                style={{
                  textAlign: "right",
                  display: "block",
                  marginTop: "8px",
                }}
                href="/login"
              >
                Have an account? Login
              </Cta>
              <div className="text-center">
                <Button type="submit" disabled={auth.isResetting}>
                  Reset Password
                </Button>
              </div>
            </form>
          </div>
        </AuthStylingLayoutChildren>
      </AuthLayout>
    </div>
  );
};

ForgotPassword.propTypes = {
  isAuthenticated: PropTypes.func,
};

export default ForgotPassword;
