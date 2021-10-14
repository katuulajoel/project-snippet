/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { Fragment } from "react";
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

export default class CookieSettingForm extends React.Component {
  static propTypes = {
    proceed: PropTypes.func,
    id: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      cookieConsents: parseDefaultConsents(),
      showConsentAlert: !getCookieConsentCloseAt() && !getCookieConsent(),
    };
  }

  onChangeConsentValue(key, e) {
    let idx = this.state.cookieConsents.indexOf(key),
      updateConsents = this.state.cookieConsents;
    if (e.target.checked) {
      if (idx === -1) {
        updateConsents = [...this.state.cookieConsents, key];
      }
    } else if (idx > -1) {
      updateConsents = [
        ...this.state.cookieConsents.slice(0, idx),
        ...this.state.cookieConsents.slice(idx + 1),
      ];
    }

    updateConsents = Array.from(new Set(updateConsents));
    this.setState({ cookieConsents: updateConsents });
  }

  onSave = (e) => {
    e.preventDefault();
    setCookieConsent(this.state.cookieConsents);
    setCookieConsentCloseAt();
    if (this.props.proceed) {
      this.props.proceed();
    }
    return;
  };

  render() {
    return (
      <form
        id={this.props.id}
        onSubmit={this.onSave}
        className="cookie-settings"
      >
        {COOKIE_OPTIONS.map((category, i) => {
          let categoryId = category[0],
            elementId = `consent-${categoryId}`;
          return (
            <Fragment key={i}>
              <FormGroup>
                <FormCheck className={category[4] ? "disabled" : ""}>
                  <span>{category[1]}</span>
                  <input
                    type="checkbox"
                    id={elementId}
                    checked={
                      (category[3] && category[4]) ||
                      this.state.cookieConsents.indexOf(categoryId) > -1
                    }
                    disabled={category[4]}
                    onChange={this.onChangeConsentValue.bind(this, categoryId)}
                  />
                  <label htmlFor={elementId}></label>
                </FormCheck>
                <div style={{ paddingLeft: "30px" }}>{category[2]}</div>
              </FormGroup>
            </Fragment>
          );
        })}

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
      </form>
    );
  }
}

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
