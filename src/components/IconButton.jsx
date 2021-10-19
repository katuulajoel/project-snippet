import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";

import Button from "./Button";
import Icon from "./Icon";

import { addEventListeners, BUTTON_EVENTS } from "../utils/events";
import { filterButtonProps } from "../utils/forms";

const IconButton = (props) => {
  return (
    <StyledButton
      type={props.type || "button"}
      className={props.className || ""}
      variant={props.variant}
      {...filterButtonProps(props)}
      {...addEventListeners(BUTTON_EVENTS, props)}
      data-tip={props["data-tip"]}
    >
      <Icon name={props.name} size={props.size} />
    </StyledButton>
  );
};

IconButton.defaultProps = {
  variant: "icon",
  type: "button",
  size: "md",
};

IconButton.propTypes = {
  variant: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes?.func,
  "data-tip": PropTypes.string,
};

const StyledButton = styled(Button)`
  &.red-icon {
    i {
      color: #da3451 !important;
    }
  }
`;

export default IconButton;
