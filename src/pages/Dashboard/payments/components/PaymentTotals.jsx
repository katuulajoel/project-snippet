import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import styled from "styled-components";

import { getInvoiceSummary } from "../../../../redux/actions/InvoiceActions";
import { numberWithCommas } from "../../../../utils/stringUtils";
import { filterPaymentSummaries } from "../../../../utils/invoiceUtils";
import Icon from "../../../../components/Icon";
import { NavActions } from "../styles";

const PaymentTotals = ({ type, project }) => {
  const dispatch = useDispatch();
  const { summary } = useSelector(({ Invoice }) => Invoice);
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const [summariesRange, setSummariesRange] = useState({
    start: `${moment(firstDay).format(moment.HTML5_FMT.DATE)}T00:00:00`,
    end: `${moment(new Date()).format(moment.HTML5_FMT.DATE)}T23:59:59`,
  });

  useEffect(() => {
    getInvoiceSummary({
      min_date: summariesRange.start,
      max_date: summariesRange.end,
      type: type == "in" ? "sale" : "purchase",
      ...(project ? project : {}),
    })(dispatch);
  }, []);

  return (
    <Wrapper>
      {!project && (
        <NavActions style={{ float: "right" }}>
          <a
            href="#"
            onClick={() =>
              filterPaymentSummaries(summariesRange, type, setSummariesRange)
            }
          >
            <Icon name="filter-variant" size="sm" /> Filter Total{" "}
            {type === "in" ? "Payments" : "Payouts"}
          </a>
        </NavActions>
      )}
      <ul>
        <li>
          <span>Total {type === "in" ? "Payments" : "Payouts"}</span>
          <p>€{numberWithCommas(summary.total)}</p>
        </li>
        <li>
          <span>Paid</span>
          <p>€{numberWithCommas(summary.paid)}</p>
        </li>
        <li>
          <span>Unpaid</span>
          <p>€{numberWithCommas(summary.unpaid)}</p>
        </li>
        {type === "in" && (
          <li>
            <span>Credit Notes</span>
            <p>
              -€
              {summary.credit_notes
                ? numberWithCommas(summary.credit_notes.total)
                : "0.00"}
            </p>
          </li>
        )}
      </ul>
    </Wrapper>
  );
};

PaymentTotals.propTypes = {
  project: PropTypes.number,
  type: PropTypes.string.isRequired,
};

PaymentTotals.defaultProps = {
  project: null,
};

const Wrapper = styled.div`
  border-bottom: 1px solid #edf1f7;

  ul {
    list-style: none;
    display: inline-flex;
    justify-content: space-evenly;
    width: 100%;

    li {
      text-align: center;
      text-align: center;
      text-transform: capitalize;
      line-height: 150%;

      span {
        font-weight: 500;
        font-size: 14px;
        color: #8f9bb3;
      }

      p {
        font-weight: 600;
        font-size: 24px;
        margin-top: 8px;
      }
    }

    li:nth-child(1) p {
      color: #3e4857;
    }

    li:nth-child(2) p {
      color: #219653;
    }

    li:nth-child(3) p {
      color: #eb5757;
    }
  }
`;

export default PaymentTotals;
