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

const AddAdminEmail = ({ onSave }) => {
  return (
    <form onSubmit={onSave} aria-label="addAdminEmail-form" id="addAdminEmail">
      <div className="header">Add admin email address for invoices</div>
      <FormInput label="New Email Address" name="invoice_email" type="email" />
      <Row>
        <Col>
          <Button
            className="btn btn-primary save"
            type="submit"
            aria-label="addAdminEmail-submit"
          >
            Save
          </Button>
        </Col>
      </Row>
    </form>
  );
};

AddAdminEmail.propTypes = {
  onSave: PropTypes.func,
};

export default AddAdminEmail;
