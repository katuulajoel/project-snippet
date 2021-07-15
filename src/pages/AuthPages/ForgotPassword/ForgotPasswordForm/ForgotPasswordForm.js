import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
// import Icon from "../../../../components/core/Icon";
import { Button, Input } from "../../../../components/core/Form/Form";
import Error from "../../../../components/core/Error";
import { resetPassword } from "../../../../actions/AuthActions";
import Progress from "../../../../components/core/Progress";
import Success from "../../../../components/core/Success";
import MetaTags from "../../../../components/core/MetaTags";
import AuthLayout, {
  AuthStylingLayoutChildren,
} from "../../../../layouts/AuthLayout";

class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      formSubmitted: false,
    };
  }

  onFormSubmit = (e) => {
    e.preventDefault();
    this.setState({ formSubmitted: true });
    const email = this.state.email.trim();
    if (!email) {
      return;
    }

    this.props.resetPassword({ email });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      formSubmitted: false,
    });
  };

  render() {
    const { auth } = this.props;
    if (auth.isAuthenticated) {
      this.props.isAuthenticated();
    }

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
            <div className="auth-form-wrapper p-0 m-0 w-100">
              <form
                onSubmit={this.onFormSubmit}
                name="login"
                role="form"
                // eslint-disable-next-line react/no-string-refs
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
                <h3 className="AuthForm__title">Reset Password</h3>
                {auth.isResetting ? <Progress /> : null}
                {auth.isReset ? (
                  <Success message="Instructions for resetting your password have been sent to your email if we find an account associated with it." />
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
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    placeholder="Enter email address"
                  />
                </div>
                {this.state.formSubmitted && !this.state.email && (
                  <div className="Form__group text-danger mt-2">
                    Please enter an email address
                  </div>
                )}
                <a
                  href="/login"
                  className="mt-2"
                  style={{ textAlign: "right", color: "#da3451" }}
                >
                  <p>Have an account? Login</p>
                </a>
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
  }
}

AuthForm.propTypes = {
  resetPassword: PropTypes.func,
  auth: PropTypes.object,
  isAuthenticated: PropTypes.func,
};

const mapStateToProps = (store) => ({
  auth: store.Auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    resetPassword: (credentials) => dispatch(resetPassword(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm);
