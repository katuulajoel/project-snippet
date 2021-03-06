import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEventListeners, BUTTON_EVENTS } from "../utils/events";
import { filterButtonProps } from "../utils/forms";
import * as actionTypes from "../configs/constants/ActionTypes";
import Loading from "./svg/Loading";

const Button = (props) => {
  return (
    <button
      // {...props}
      type={props.type}
      form={props.form}
      className={`btn ${props.variant ? `btn-${props.variant}` : ""} ${
        props.className || ""
      } ${props.block ? "btn-block" : ""} ${
        props.size ? `btn-${props.size}` : ""
      }`}
      {...filterButtonProps(props)}
      {...addEventListeners(BUTTON_EVENTS, props)}
      data-tip={props["data-tip"]}
    >
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  type: "button",
  form: null,
  variant: "default",
  block: false,
};

Button.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  block: PropTypes.bool,
  children: PropTypes.any,
  form: PropTypes.string,
  "data-tip": PropTypes.string,
};

export const AnimatedButton = ({ children, ...props }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const { common } = useSelector((store) => store);

  const setSubmit = () => {
    if (props.default) return;
    return dispatch({
      type: actionTypes.SET_BUTTON,
      data: true,
    });
  };

  useEffect(() => {
    if (!common.button) {
      setActive(false);
    }
  }, [common.button]);

  useEffect(() => {
    dispatch({
      type: actionTypes.SET_BUTTON,
      data: false,
    });
    let form;
    if (props.targetform) {
      form = document.querySelector(props.targetform);
    } else {
      let forms = document.querySelectorAll("form");
      form = forms[1] ? forms[1] : forms[0];
    }

    form.addEventListener("submit", setSubmit);
    return () => form.removeEventListener("submit", setSubmit);
  }, []);

  return (
    <button
      type={active && common && common.button ? "button" : "submit"}
      onClick={() => {
        setActive(true);
        console.log(props.targetform);
      }}
      {...props}
      className={`btn btn-primary save animate ${props.className}`}
    >
      {active && common && common.button ? <Loading /> : children}
    </button>
  );
};

AnimatedButton.propTypes = {
  default: PropTypes.bool,
  children: PropTypes.any,
  className: PropTypes.string,
  targetform: PropTypes.string,
};

export default Button;
