import React from "react";
import { useSelector } from "react-redux";
import { ENDPOINT_PAYONEER_SIGNUP } from "../../../utils/api";
// import { STATUS_INITIATED } from "../../../configs/constants/ActionTypes";
import styled from "styled-components";
// export const STATUS_APPROVED = "approved";
// export const STATUS_DECLINED = "declined";
export const STATUS_INITIATED = "initiated";
// export const STATUS_PENDING = "pending";

const Payment = () => {
  const { user } = useSelector(({ Auth }) => Auth);

  return (
    <div>
      <PayoneerCard>
        <div>
          <h4>Payoneer</h4>
          <p>
            To receive payments for your work on Tunga, you need to setup
            Payoneer. You can do so using the button below.
          </p>
          <h5>Status: {user.payoneer_status || ""}</h5>

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
