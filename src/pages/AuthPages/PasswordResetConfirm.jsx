import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Error from "../../components/Error";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Success from "../../components/Success";
import FieldError from "../../components/FieldError";
import PropTypes from "prop-types";
import AuthLayout, {
  AuthStylingLayoutChildren,
} from "../../layouts/AuthLayout";
import { resetPasswordConfirm } from "../../redux/actions/AuthActions";

const PasswordResetConfirm = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user, isMakingRequest, errors } = useSelector(({ Auth }) => Auth);
  const { newUser, uid, token } = props;
  const formEl = useRef(null);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  useEffect(() => {
    if (user?.id) {
      history.push("/dashboard");
    }
  }, []);

  const onConfirm = (e) => {
    e.preventDefault();
    if (!password1 || !password2) {
      return;
    }
    dispatch(
      resetPasswordConfirm({
        uid,
        token,
        password1,
        password2,
      })
    );
  };

  return (
    <AuthLayout>
      <AuthStylingLayoutChildren>
        <form
          onSubmit={onConfirm}
          name="reset-confirm"
          role="form"
          ref={formEl}
        >
          <h3>{newUser ? "Create" : "Reset"} Password</h3>
          {errors.confirmPassword && errors.confirmPassword.token && (
            <Error message="Invalid token" />
          )}

          {isMakingRequest.confirmPassword && (
            <Success
              message={`Password ${newUser ? "set" : "changed"} successfully`}
            />
          )}

          {errors.confirmPassword && errors.confirmPassword.new_password1 ? (
            <FieldError message={errors.confirmPassword.new_password1} />
          ) : (
            ""
          )}
          <div className="form-group mt-4">
            <label className="Auth_label">
              {newUser ? null : "New "}Password
              <span>*</span>
            </label>
            <div>
              <Input
                label=""
                type="password"
                id="password1"
                className="form-control"
                required
                placeholder="Enter password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value.trim())}
              />
            </div>
          </div>
          {errors.confirmPassword && errors.confirmPassword.new_password2 ? (
            <FieldError message={errors.confirmPassword.new_password2} />
          ) : (
            ""
          )}
          <div className="form-group">
            <label className="Auth_label">
              Confirm {newUser ? null : "New "}Password
              <span>*</span>
            </label>
            <div>
              <Input
                label=""
                type="password"
                id="password2"
                className="form-control"
                required
                placeholder="Enter password again"
                value={password2}
                onChange={(e) => setPassword2(e.target.value.trim())}
              />
            </div>
          </div>

          <div className="clearfix text-center">
            <Button
              type="submit"
              className="btn-block"
              disabled={isMakingRequest.confirmPassword}
            >
              {newUser ? "Set" : "Change"} Password
            </Button>
          </div>
        </form>
      </AuthStylingLayoutChildren>
    </AuthLayout>
  );
};

PasswordResetConfirm.defaultProps = {
  newUser: false,
  uid: "",
  token: "",
};

PasswordResetConfirm.propTypes = {
  uid: PropTypes.string,
  token: PropTypes.string,
  newUser: PropTypes.bool,
  Auth: PropTypes.any,
};

export default PasswordResetConfirm;
