import React from "react";
import PropTypes from "prop-types";
import { FormGroup } from "reactstrap";

const Label = ({ name, children }) => (
  <div className="row" aria-label="label">
    <div className="col-sm-12">
      <FormGroup>
        <label className="control-label" aria-label={name}>
          {name}
          <span className="label-style">*</span>
        </label>
        {children}
      </FormGroup>
    </div>
  </div>
);

Label.propTypes = {
  name: PropTypes.string,
  children: PropTypes.element,
};

export default Label;
