import React from "react";
import { Link } from "react-router-dom";
import "./Form.scss";
import CoreButton from "../Button";
import PropTypes from "prop-types";

const __props = {
  children: PropTypes.any,
  className: PropTypes.string,
};

export const Group = ({ children, ...props }) => (
  <div {...props} className={`${props.className || ""} Form__group`}>
    {children}
  </div>
);

Group.propTypes = __props;

export const IconGroup = ({ children, ...props }) => (
  <div {...props} className={`${props.className || ""} Form__input-icon-group`}>
    {children}
  </div>
);

IconGroup.propTypes = __props;

export const Cta = ({ children, ...props }) => (
  <Link
    {...props}
    to={props.href}
    className={`${props.className || ""} Form__cta`}
  >
    {children}
  </Link>
);

Cta.propTypes = { href: PropTypes.string, ...__props };

export const Select = ({ children, ...props }) => (
  <select
    {...props}
    className={`${props.className || ""} Form__input Form__select`}
  >
    {children}
  </select>
);

Select.propTypes = __props;

export const Label = ({ children, ...props }) => (
  <label {...props} className={`${props.className || ""} Form__Label`}>
    {children}
  </label>
);

Label.propTypes = __props;

export const Title = ({ children, ...props }) => (
  <div {...props} className={`${props.className || ""} Form__title`}>
    {children}
  </div>
);

Title.propTypes = __props;

export const Form = ({ children, ...props }) => (
  <form {...props} className={`${props.className || ""} Form`}>
    {children}
  </form>
);

Form.propTypes = __props;

export const Button = ({ children, ...props }) => (
  <CoreButton
    {...props}
    className={`${props.className || ""} btn Form__btn btn-primary`}
    size="md"
    variant=""
  >
    {children}
  </CoreButton>
);

Button.propTypes = __props;
