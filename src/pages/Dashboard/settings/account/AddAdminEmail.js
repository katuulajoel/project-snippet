/* eslint-disable react/no-unescaped-entities */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";

/* ------------------------- Component dependencies ------------------------- */
import { AnimatedButton } from "../../../../components/Button";
import FormInput from "./FormInput";

const AddAdminEmail = ({ onSave }) => {
  return (
    <form onSubmit={onSave} aria-label="addAdminEmail-form" id="addAdminEmail">
      <div className="header">Add admin email address for invoices</div>
      <FormInput label="New Email Address" name="invoice_email" type="email" />
      <Row>
        <Col>
          <AnimatedButton
            aria-label="addAdminEmail-submit"
            targetform="#addAdminEmail"
            className="loader-opaque"
          >
            Save
          </AnimatedButton>
        </Col>
      </Row>
    </form>
  );
};

AddAdminEmail.propTypes = {
  onSave: PropTypes.func,
};

export default AddAdminEmail;
