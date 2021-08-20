import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

const Cta = ({ children, ...props }) => (
  <Wrapper
    {...props}
    to={props.href}
    className={`${props.className || ""} Form__cta`}
  >
    {children}
  </Wrapper>
);

const Wrapper = styled(Link)`
  font-size: 14px;
  line-height: 17px;
  color: #da3451;
  text-decoration: none;
`;

Cta.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
};

export default Cta;
