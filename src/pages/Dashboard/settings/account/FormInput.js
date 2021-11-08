/* eslint-disable react/no-unescaped-entities */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";
/* ------------------------- Component dependencies ------------------------- */
// import CustomInputGroup from "../../../components/CustomInputGroup";
import Input from "../../../../components/Input";

const FormInput = ({ label, type = "text", name }) => (
  <FormGroup>
    <Label>
      {label}
      <span className="label-style">*</span>
    </Label>
    <Input
      type={type}
      name={name}
      aria-label={name}
      // value={form.invoice_email}
      placeholder="Enter your password"
      required
    />
  </FormGroup>
);

FormInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

export default FormInput;
