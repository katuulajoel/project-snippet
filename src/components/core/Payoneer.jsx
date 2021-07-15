import PropTypes from "prop-types";
import React from "react";

import Mark from "../../assets/images/icons/success.svg";
import Icon from "../core/Icon";
import {
  ENDPOINT_PAYONEER_SIGNUP,
  STATUS_APPROVED,
  STATUS_DECLINED,
  STATUS_INITIATED,
  STATUS_PENDING,
} from "../../actions/utils/api";
import styled from "styled-components";

const Payoneer = (props) => {
  const { message, nextUrl, errorUrl } = props,
    currentUrl = `${window.location.origin}${window.location.pathname}`;

  let { user, status } = props;

  if (!__PRODUCTION__) {
    if (status === "error") {
      status = "";
      user.payoneer_status = STATUS_APPROVED;
    }
  }

  return (
    <div>
      <PayoneerCard>
        <div>
          {user.payoneer_status === STATUS_APPROVED ? (
            <div className="media">
              <img src={Mark} />
              <div className="media-body ml-3">
                <h4>Setup Complete</h4>
                <p style={{ margin: 0 }}>
                  Payoneer is setup correctly. You are ready to receive
                  payments.
                </p>
              </div>
            </div>
          ) : user.payoneer_status === STATUS_PENDING ||
            status === STATUS_PENDING ? (
            <div>
              <Icon name="attention" size="main" className="orange" />
              <span>
                {" "}
                {message || "Your Payoneer application is still under review"}
              </span>
            </div>
          ) : (
            <div>
              {user.payoneer_status === STATUS_DECLINED ||
              status === "error" ? (
                <p>
                  <Icon name="attention" size="main" className="error" />
                  <span>
                    {" "}
                    {message ||
                      "Your Payoneer application was declined, please try again"}
                  </span>
                </p>
              ) : null}

              {user.payoneer_status === STATUS_INITIATED ? (
                <p>
                  <Icon name="attention" size="main" className="orange" />
                  <span>
                    {" "}
                    {message || "Your Payoneer application has been initiated"}
                  </span>
                </p>
              ) : null}
              {user.payoneer_status !== STATUS_APPROVED && (
                <>
                  {" "}
                  <h4>Setup Payoneer</h4>
                  <p>
                    To receive payments for your work on Tunga, you need to
                    setup Payoneer. You can do so using the button below.
                  </p>
                </>
              )}
              <a
                href={`${ENDPOINT_PAYONEER_SIGNUP}?next_url=${encodeURIComponent(
                  nextUrl || currentUrl
                )}&error_url=${encodeURIComponent(errorUrl || currentUrl)}`}
                className="btn btn-primary"
                title="Setup Payoneer"
              >
                {user.payoneer_status === STATUS_INITIATED
                  ? "Having trouble? Re-setup Payoneer account"
                  : "Setup Payoneer"}
              </a>
            </div>
          )}
        </div>
      </PayoneerCard>
    </div>
  );
};

Payoneer.propTypes = {
  user: PropTypes.object,
  status: PropTypes.string,
  message: PropTypes.string,
  nextUrl: PropTypes.string,
  errorUrl: PropTypes.string,
};
const PayoneerCard = styled.div`
  h4 {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    /* identical to box height */

    color: #151a30;
  }
  a {
    box-shadow: none !important;
  }
  p {
    font-weight: 300;
    font-size: 16px;
    line-height: 150%;
    /* or 24px */

    color: #3e4857;
  }
`;

export default Payoneer;
