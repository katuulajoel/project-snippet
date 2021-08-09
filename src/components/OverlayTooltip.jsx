import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "reactstrap";
import randomstring from "./utils/stringUtils";

const OverlayTooltip = (props) => {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line react/prop-types
  const { overlay, children, className, placement, tooltipId } = props;

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <div id={tooltipId} className={`d-inline-block ${className || ""}`}>
        {children}
      </div>

      <Tooltip
        isOpen={open}
        target={tooltipId}
        toggle={toggle}
        placement={placement}
      >
        {overlay}
      </Tooltip>
    </>
  );
};

OverlayTooltip.defaultProps = {
  placement: "auto",
  tooltipId: randomstring.generate(),
};

OverlayTooltip.propTypes = {
  overlay: PropTypes.any,
  className: PropTypes.string,
  placement: PropTypes.string,
  tooltipId: PropTypes.string,
};

export default OverlayTooltip;
