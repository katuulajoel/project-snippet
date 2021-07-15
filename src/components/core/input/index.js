/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

/* ----------------------------- Input PropTypes ---------------------------- */
const propTypes = {
  type: PropTypes.string,
  id: PropTypes.string,
  errorMessage: PropTypes.string,
  placeholder: PropTypes.string,
  hasStrip: PropTypes.bool,
  label: PropTypes.string,
  isInvalid: PropTypes.bool,
};

/* --------------------------- Input defaultProps --------------------------- */
const defaultProps = {
  type: "input",
  id: 0,
  placeholder: "input",
  errorMessage: "This field is required",
  hasStrip: null,
  label: "Label",
  isInvalid: null,
};

const Input = React.forwardRef(
  (
    {
      id,
      type,
      placeholder,
      hasStrip,
      label,
      isInvalid,
      errorMessage,

      ...rest
    },
    ref
  ) => {
    const [showPassword, onShowPassword] = useState("password");

    return (
      <InputContainer
        hasStrip={hasStrip}
        isInvalid={isInvalid}
        disabled={rest?.disabled}
        data-testid="input"
      >
        {label && <label htmlFor={label}>{label}</label>}
        <input
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
          type={type === "password" ? showPassword : type}
          id={id}
          ref={ref}
          className="form-control"
          placeholder={placeholder}
          data-testid="inputs"
        />

        {type === "password" && (
          <button
            onClick={() =>
              onShowPassword(
                `${showPassword === "password" ? "input" : "password"}`
              )
            }
            className={`input-icon ${
              showPassword === "input" ? "active__showpassword" : ""
            }`}
            type="button"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 5.41667C11.5323 5.41157 13.0349 5.83899 14.3351 6.64977C15.6353 7.46056 16.6804 8.6218 17.35 10C15.975 12.8083 13.1667 14.5833 10 14.5833C6.83337 14.5833 4.02504 12.8083 2.65004 10C3.31972 8.6218 4.36473 7.46056 5.66494 6.64977C6.96515 5.83899 8.46776 5.41157 10 5.41667ZM10 3.75C5.83337 3.75 2.27504 6.34167 0.833374 10C2.27504 13.6583 5.83337 16.25 10 16.25C14.1667 16.25 17.725 13.6583 19.1667 10C17.725 6.34167 14.1667 3.75 10 3.75ZM10 7.91667C10.5526 7.91667 11.0825 8.13616 11.4732 8.52686C11.8639 8.91756 12.0834 9.44747 12.0834 10C12.0834 10.5525 11.8639 11.0824 11.4732 11.4731C11.0825 11.8638 10.5526 12.0833 10 12.0833C9.44751 12.0833 8.9176 11.8638 8.5269 11.4731C8.1362 11.0824 7.91671 10.5525 7.91671 10C7.91671 9.44747 8.1362 8.91756 8.5269 8.52686C8.9176 8.13616 9.44751 7.91667 10 7.91667ZM10 6.25C7.93337 6.25 6.25004 7.93333 6.25004 10C6.25004 12.0667 7.93337 13.75 10 13.75C12.0667 13.75 13.75 12.0667 13.75 10C13.75 7.93333 12.0667 6.25 10 6.25Z"
                fill={showPassword === "password" ? "#8F9BB3" : "#f66262"}
              />
            </svg>
          </button>
        )}
        {isInvalid && (
          <Text color="#f66262" fontSize="12px" className="error">
            {errorMessage}
          </Text>
        )}
      </InputContainer>
    );
  }
);

const InputContainer = styled.div`
  margin-bottom: 1.5rem;
  input[id="fname"],
  input[id="lname"] {
    width: 190px;
  }
  input {
    width: 400px;
    height: 40px;
    border: 1px solid rgba(194, 204, 217, 0.25);
    box-sizing: border-box;
    border-radius: 4px;
    background: #ffffff;
    box-sizing: border-box;
    font-style: normal;
    font-family: var(--font-primary);
    font-weight: normal;
    font-size: 15px;
    /* identical to box height */

    padding: 1.4rem 1.3rem;
    box-shadow: none;
    line-height: 150%;
    /* identical to box height, or 24px */

    color: #8f9bb3;

    ${(props) => (props.touched ? `box-shadow: none !important;` : ``)}
    &:focus {
      border: 1px solid #da3451 !important;
      box-shadow: none !important;
    }
  }
  label {
    font-weight: 500;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */

    color: #151a30;
  }
  button {
    &.input-icon {
      height: 43px;
      z-index: 12;
      width: 34px;
      align-items: center;
      justify-content: center;
      display: flex;
      margin-right: 2px;
      float: right;
      cursor: pointer;
      background: white;
      border: none;
      margin-top: -2.8rem;

      &.active__showpassword {
        svg {
          stroke: var(--theme-primary);
        }
      }
    }

    &.error {
      color: red;
      font-size: 12px;
      margin-top: 3px;
      display: block;
    }
  }
`;

export const Text = styled.span`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize};
  overflow-wrap: break-word;
`;

Input.defaultProps = defaultProps;

Input.propTypes = propTypes;

export default Input;
