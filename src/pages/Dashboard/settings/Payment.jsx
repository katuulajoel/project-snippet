import React from "react";
import { useSelector } from "react-redux";
import { ENDPOINT_PAYONEER_SIGNUP } from "../../../utils/api";
// import { STATUS_INITIATED } from "../../../configs/constants/ActionTypes";
import styled from "styled-components";
import Icon from "../../../components/Icon";
import Mark from "../../../assets/images/icons/success.svg";

const STATUS_APPROVED = "approved";
const STATUS_DECLINED = "declined";
const STATUS_INITIATED = "initiated";
const STATUS_PENDING = "pending";

const Payment = () => {
  const { user } = useSelector(({ Auth }) => Auth);

  return (
    <div>
      <PayoneerCard>
        <div>
          {user.payoneer_status === STATUS_APPROVED && (
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
          )}

          {user.payoneer_status === STATUS_PENDING && (
            <div>
              <Icon name="attention" size="main" className="orange" />
              <span>Your Payoneer application is still under review</span>
            </div>
          )}

          <div>
            {user.payoneer_status === STATUS_DECLINED && (
              <p>
                <Icon name="attention" size="main" className="error" />
                <span>
                  Your Payoneer application was declined, please try again
                </span>
              </p>
            )}

            {user.payoneer_status === STATUS_INITIATED && (
              <p>
                <Icon name="attention" size="main" className="orange" />
                <span>Your Payoneer application has been initiated</span>
              </p>
            )}

            {user.payoneer_status !== STATUS_APPROVED && (
              <>
                {" "}
                <h4>Setup Payoneer</h4>
                <p>
                  To receive payments for your work on Tunga, you need to setup
                  Payoneer. You can do so using the button below.
                </p>
              </>
            )}

            <a
              href={`${ENDPOINT_PAYONEER_SIGNUP}?next_url=${encodeURIComponent(
                user.payoneer_signup_url
              )}&error_url=${encodeURIComponent(
                `${window.location.origin}/settings/payment`
              )}`}
              className="btn btn-primary"
              title="Setup Payoneer"
            >
              {user && user.payoneer_status === STATUS_INITIATED
                ? "Having trouble? Re-setup Payoneer account"
                : "Setup Payoneer"}
            </a>
          </div>
        </div>
      </PayoneerCard>
    </div>
  );
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

export default Payment;
