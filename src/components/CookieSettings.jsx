import React from "react";
import { FormGroup } from "reactstrap";
import PropTypes from "prop-types";

import {
  COOKIE_OPTIONS,
  getCookieConsentCloseAt,
  getCookieConsent,
  parseDefaultConsents,
  setCookieConsentCloseAt,
  setCookieConsent,
} from "./utils/consent";
import Button from "./Button";

export default class CookieSettings extends React.Component {
  static propTypes = {
    proceed: PropTypes.func,
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
      <form onSubmit={this.onSave} className="cookie-settings">
        {COOKIE_OPTIONS.map((category) => {
          let categoryId = category[0],
            elementId = `consent-${categoryId}`;
          return (
            <>
              <p>
                We use cookies to offer you a better browsing experience,
                analyze site traffic, personalize content, assist with our
                promotional & marketing efforts & provide content from third
                parties. You can opt in/out of cookies using the settings below.
              </p>
              <FormGroup>
                <div className="form-check">
                  <label className="form-check-label" htmlFor={elementId}>
                    {category[1]}
                  </label>
                  <input
                    className="switch form-check-input"
                    id={elementId}
                    type="checkbox"
                    checked={
                      (category[3] && category[4]) ||
                      this.state.cookieConsents.indexOf(categoryId) > -1
                    }
                    disabled={category[4]}
                    onChange={this.onChangeConsentValue.bind(this, categoryId)}
                  />
                </div>
                <div>{category[2]}</div>
              </FormGroup>
            </>
          );
        })}

        <FormGroup>
          Learn more from the {"Cookies"} section of our{" "}
          <a href="https://tunga.io/privacy/#cookies">Privacy Policy.</a>
        </FormGroup>

        <div className="text-right">
          <Button type="submit">Save Settings</Button>
        </div>
      </form>
    );
  }
}
