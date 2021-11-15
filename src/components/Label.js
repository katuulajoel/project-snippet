import React from "react";
import PropTypes from "prop-types";
import { FormGroup } from "reactstrap";

const Label = ({ name, required, children }) => (
  <div className="row" aria-label="label">
    <div className="col-sm-12">
      <FormGroup>
        <label className="control-label" aria-label={name}>
          {name}
          {required && <span className="label-style">*</span>}
        </label>
        {children}
      </FormGroup>
    </div>
  </div>
);

Label.defaultProps = {
  required: true,
};

Label.propTypes = {
  name: PropTypes.string,
  required: PropTypes.bool,
  children: PropTypes.element,
};

export default Label;
