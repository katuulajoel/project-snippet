/* eslint-disable react/no-unescaped-entities */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
/* ------------------------- Component dependencies ------------------------- */
// import CustomInputGroup from "../../../components/CustomInputGroup";
import Button from "../../../../components/Button";
import FormInput from "./FormInput";

const ChangePassword = ({ onSave }) => {
  return (
    <form
      onSubmit={onSave}
      className="update-password-form"
      aria-label="changePassword-form"
      id="changePassword"
    >
      <div className="header">Change Password</div>
      <Row>
        <Col>
          <FormInput
            type="password"
            name="old_password"
            label="Current Password"
          />
        </Col>
        <Col>
          <FormInput
            type="password"
            name="new_password1"
            label="New Password"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="save" type="submit">
            Save
          </Button>
        </Col>
      </Row>
    </form>
  );
};

ChangePassword.propTypes = {
  onSave: PropTypes.func,
};

export default ChangePassword;
