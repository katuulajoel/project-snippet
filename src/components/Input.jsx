/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import React from "react";
import { addEventListeners, INPUT_EVENTS } from "./utils/events";
import { filterInputProps } from "./utils/forms";

const Input = props => {
    const onchangeActions = e => {
        if (props.type === "number") {
            const re = /^[0-9\b]+$/;
            if (
                props.step === 1 &&
                !(e.target.value === "" || re.test(e.target.value))
            ) {
                return;
            }
            if (imposeMinMax(e.target)) {
                return;
            }

            props.onChange(e);
        } else {
            props.onChange(e);
        }
    };

    function imposeMinMax(el) {
        if (el.value != "") {
            if (parseInt(el.value) < parseInt(props.min)) {
                return true;
            }
            if (parseInt(el.value) > parseInt(props.max)) {
                return true;
            }
        }
        return false;
    }
    return (
        <input
            data-testid="input-field"
            type={props.type}
            className={`form-control ${props.className || ""} ${
                props.size ? `form-control-${props.size}` : ""
            }`}
            placeholder={props.placeholder}
            required={props.required}
            {...filterInputProps(props)}
            {...addEventListeners(INPUT_EVENTS, props)}
            onChange={e => onchangeActions(e)}
        />
    );
};

Input.defaultProps = {
    type: "text"
};

Input.propTypes = {
    type: PropTypes.string,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    required: PropTypes.bool,
    step: PropTypes.number
};

export default Input;
