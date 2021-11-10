/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useState } from "react";
import { FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import styled from "styled-components";

/* -------------------------------- Utilities ------------------------------- */
import {
  COOKIE_OPTIONS,
  getCookieConsentCloseAt,
  getCookieConsent,
  parseDefaultConsents,
  setCookieConsentCloseAt,
  setCookieConsent,
} from "../../../../components/utils/consent";

const CookieSettingForm = (props) => {
  const [cookie] = useState({
    cookieConsents: parseDefaultConsents(),
    showConsentAlert: !getCookieConsentCloseAt() && !getCookieConsent(),
  });

  const onSave = (e) => {
    e.preventDefault();
    setCookieConsent(cookie.cookieConsents);
    setCookieConsentCloseAt();
    if (props.proceed) {
      props.proceed();
    }
    return;
  };

  return (
    <form id={props.id} onSubmit={onSave} className="cookie-settings">
      {COOKIE_OPTIONS.map(
        ({ id, name, title, content, defaultChecked, disabled }, i) => {
          let elementId = `consent-${id}`;
          return (
            <FormGroup key={i}>
              <FormCheck className={disabled ? "disabled" : ""}>
                <span>{title}</span>
                <input
                  type="checkbox"
                  id={elementId}
                  defaultChecked={
                    (props.settings && props.settings[name]) ||
                    defaultChecked ||
                    cookie.cookieConsents.indexOf(id) > -1
                  }
                  disabled={disabled}
                  aria-label={`check-${id}`}
                  onChange={(e) => props.onChange(name, e.target.checked)}
                />
                <label htmlFor={elementId}></label>
              </FormCheck>
              <div style={{ paddingLeft: "30px" }}>{content}</div>
            </FormGroup>
          );
        }
      )}

      <FormGroup>
        Learn more from the {"Cookies"} section of our{" "}
        <a
          style={{
            color: "#151A30",
            fontWeight: "600",
            textDecoration: "none",
          }}
          href="https://tunga.io/privacy/#cookies"
        >
          Privacy Policy.
        </a>
      </FormGroup>

      {/* <button
        aria-label="save"
        className="btn btn-primary save"
        // bsStyle="primary"
      >
        Save
      </button> */}
    </form>
  );
};

CookieSettingForm.propTypes = {
  proceed: PropTypes.func,
  id: PropTypes.string,
  onChange: PropTypes.func,
  settings: PropTypes.object,
};

export default CookieSettingForm;
const FormCheck = styled.div`
  position: relative;
  padding-left: 30px;
  margin-bottom: 8px;

  &.disabled {
    span {
      font-weight: 100;
    }

    label {
      opacity: 0.4;
    }
  }

  input[type="checkbox"] {
    visibility: hidden;
  }

  span {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #151a30;
  }

  input[type="checkbox"]:checked + label:after {
    opacity: 1;
  }

  label {
    background: transparent;
    border: 2px solid #8f9bb3;
    cursor: pointer;
    height: 20px;
    left: 0;
    position: absolute;
    top: 0;
    width: 20px;
    color: #8f9bb3;
    margin-top: 2px;
  }

  label:after {
    border-width: 2px;
    border-style: none none solid solid;
    content: "";
    height: 5px;
    left: 2px;
    opacity: 0;
    position: absolute;
    top: 5px;
    -ms-transform: rotate(-45deg); /* IE 9 */
    -webkit-transform: rotate(-45deg); /* Safari and Chrome */
    transform: rotate(-45deg);
    width: 12px;
  }
`;
