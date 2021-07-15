/* eslint-disable react/no-string-refs */
/* eslint-disable react/prop-types */
import React from "react";
import querystring from "querystring";
import connect from "../../../connectors/AuthConnector";

import Error from "../../../components/core/Error";
import Button from "../../../components/core/Button";
import Input from "../../../components/core/input/index";
import Success from "../../../components/core/Success";
import FieldError from "../../../components/core/FieldError";
import PropTypes from "prop-types";
import AuthLayout, {
  AuthStylingLayoutChildren,
} from "../../../layouts/AuthLayout";

class PasswordResetConfirm extends React.Component {
  static defaultProps = {
    newUser: false,
  };

  static propTypes = {
    uid: PropTypes.string.required,
    token: PropTypes.string.required,
    newUser: PropTypes.bool,
  };

  componentDidUpdate(prevProps) {
    if (this.props.Auth.isReset && !prevProps.Auth.isReset) {
      // eslint-disable-next-line react/no-string-refs
      this.refs.reset_confirm_form.reset();

      const { location } = this.props,
        queryParams = querystring.parse(
          (location.search || "").replace("?", "")
        );
      let next = "/dashboard";
      if (queryParams && queryParams.next) {
        next = queryParams.next;
      }
      window.location.href = next;
    }
  }

  onConfirm = (e) => {
    e.preventDefault();
    let { uid, token } = this.props,
      new_password1 = this.refs.new_password1.value.trim(),
      new_password2 = this.refs.new_password2.value.trim();

    if (!new_password1 || !new_password2) {
      return;
    }
    this.props.AuthActions.resetPasswordConfirm({
      uid,
      token,
      new_password1,
      new_password2,
    });
  };

  render() {
    const { Auth, newUser } = this.props,
      queryParams = querystring.parse((location.search || "").replace("?", ""));
    let isNew = newUser || queryParams.new_user;
    return (
      <AuthLayout>
        <AuthStylingLayoutChildren>
          <form
            onSubmit={this.onConfirm}
            name="reset-confirm"
            role="form"
            ref="reset_confirm_form"
          >
            <h3>{isNew ? "Create" : "Reset"} Password</h3>
            {Auth.error.reset_confirm && Auth.error.reset_confirm.token ? (
              <Error message="Invalid token" />
            ) : null}

            {Auth.isReset ? (
              <Success
                message={`Password ${isNew ? "set" : "changed"} successfully`}
              />
            ) : null}

            {Auth.error.reset_confirm &&
            Auth.error.reset_confirm.new_password1 ? (
              <FieldError message={Auth.error.reset_confirm.new_password1} />
            ) : (
              ""
            )}
            <div className="form-group mt-4">
              <label className="control-label">
                {isNew ? null : "New "}Password
                <span
                  style={{
                    color: "#da3451",
                    paddingLeft: "2px",
                  }}
                >
                  *
                </span>
              </label>
              <div>
                <Input
                  label=""
                  type="password"
                  className="form-control"
                  ref="new_password1"
                  required
                  placeholder="Enter password"
                />
              </div>
            </div>
            {Auth.error.reset_confirm &&
            Auth.error.reset_confirm.new_password2 ? (
              <FieldError message={Auth.error.reset_confirm.new_password2} />
            ) : (
              ""
            )}
            <div className="form-group">
              <label className="control-label">
                Confirm {isNew ? null : "New "}Password
                <span
                  style={{
                    color: "#da3451",
                    paddingLeft: "2px",
                  }}
                >
                  *
                </span>
              </label>
              <div>
                <Input
                  label=""
                  type="password"
                  className="form-control"
                  ref="new_password2"
                  required
                  placeholder="Enter password again"
                />
              </div>
            </div>

            <div className="clearfix text-center">
              <Button
                type="submit"
                className="btn-block"
                disabled={Auth.isResetting}
              >
                {isNew ? "Set" : "Change"} Password
              </Button>
            </div>
          </form>
        </AuthStylingLayoutChildren>
      </AuthLayout>
    );
  }
}

export default connect(PasswordResetConfirm);
