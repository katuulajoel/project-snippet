/* eslint-disable react/no-unescaped-entities */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

/* ------------------------- Component dependencies ------------------------- */
import Button from "../../../../components/Button";
import FormInput from "./FormInput";

const ChangeEmail = ({ onSave }) => {
  return (
    <form onSubmit={onSave} aria-label="changeEmail-form" id="changeEmail">
      <div className="header">Change Email Address</div>

      <Row>
        <Col>
          <FormInput name="email" type="email" label="New Email Address" />
        </Col>
        <Col>
          <FormInput name="password" type="password" label="Password" />
        </Col>
      </Row>

      <Row>
        <Col>
          <Button
            className="save"
            type="submit"
            // disabled={user.email === this.state.email} // TODO: add toast to notify user whats is going wrong
          >
            Save
          </Button>
        </Col>
      </Row>
    </form>
  );
};

ChangeEmail.propTypes = {
  onSave: PropTypes.func,
};

export default ChangeEmail;
