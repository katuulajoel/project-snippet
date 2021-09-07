/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useHistory } from "react-router-dom";

import Icon from "../../../components/Icon";
import SectionNav from "../../../components/SectionNav";
import { isDev } from "../../../components/utils/auth";
import DashboardLayout from "../../../layouts/DashboardLayout";
import InvoiceListContainer from "./InvoiceListContainer";
import Payments from "./Payments";

import {
  INVOICE_TYPE_SALE,
  INVOICE_TYPE_CREDIT_NOTE,
  INVOICE_TYPE_PURCHASE,
} from "../../../actions/utils/api";

import { getInvoiceSummary } from "../../../actions/InvoiceActions";
import { numberWithCommas } from "../../../components/utils/stringUtils";
import Payouts from "./Payouts";

export default function PaymentsPage() {
  let { type, status } = useParams();
  const [filter, setFilter] = useState(null);
  const [exportType, setexportType] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  var date = new Date();
  const { summary } = useSelector(({ Invoice }) => Invoice);
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const [summariesRange, setSummariesRange] = useState({
    start: `${moment(firstDay).format(moment.HTML5_FMT.DATE)}T00:00:00`,
    end: `${moment(new Date()).format(moment.HTML5_FMT.DATE)}T23:59:59`,
  });

  useEffect(() => {
    getInvoiceSummary({
      min_date: summariesRange.start,
      max_date: summariesRange.end,
      type: "sale",
    })(dispatch);
  }, []);

  useEffect(() => {
    const title = history.location.pathname.split("/")[1];
    setexportType(title);
    setFilter(status);
  }, [status]);

  const exportCsv = () => {
    // downloadCsv(filter, exportType, InvoiceActions);
  };

  console.log("type:", type);
  return (
    <DashboardLayout>
      <Wrapper>
        <div className="pay-summary">
          <ul>
            <li>
              <span>Total Payments</span>
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
            <li>
              <span>Credit Notes</span>
              <p>
                -€
                {summary.credit_notes
                  ? numberWithCommas(summary.credit_notes.total)
                  : "0.00"}
              </p>
            </li>
          </ul>
        </div>

        <SectionNav
          links={[
            ...(isDev()
              ? [
                  { route: `payments/${type}/all`, name: "All" },
                  {
                    route: `payments/${type}/pending`,
                    name: "Pending",
                  },
                  { route: `payments/${type}/paid`, name: "Paid" },
                ]
              : [
                  { route: `payments/${type}/all`, name: "All" },
                  {
                    route: `payments/${type}/overdue`,
                    name: "Overdue",
                  },
                  {
                    route: `payments/${type}/pending`,
                    name: "Pending",
                  },
                  { route: `payments/${type}/paid`, name: "Paid" },
                  {
                    route: `payments/${type}/archived`,
                    name: "Archived",
                  },
                ]),
          ]}
          style={{ marginTop: "40px" }}
          rightActions={
            !isDev() && (
              <NavActions>
                <a href="#" className="add-btn" onClick={() => {}}>
                  <Icon name="file-upload-outline" size="sm" /> Export
                </a>
              </NavActions>
            )
          }
        />

        <Switch>
          <Route
            path={`/payments/${type}/:filter`}
            render={(props) => {
              return (
                <InvoiceListContainer
                  {...props}
                  {...(type === "in"
                    ? {
                        types:
                          INVOICE_TYPE_SALE + "," + INVOICE_TYPE_CREDIT_NOTE,
                      }
                    : { type: INVOICE_TYPE_PURCHASE })}
                >
                  {type === "in" ? (
                    <Payments {...props} filter={type} exportCsv={exportCsv} />
                  ) : (
                    <Payouts {...props} filter={type} exportCsv={exportCsv} />
                  )}
                </InvoiceListContainer>
              );
            }}
          />
          {/* <Redirect from="*" to={`/payments/${type}/all`} /> */}
        </Switch>
      </Wrapper>
    </DashboardLayout>
  );
}

const NavActions = styled.div`
  display: inline;
  float: right;

  a {
    color: #8f9bb3;
    font-weight: 500;
    font-size: 14px;
    text-decoration: none;
    margin-left: 25px;

    i {
      vertical-align: baseline;
      margin-right: 5px;
    }
  }

  .add-btn {
    color: #062e64;
    font-weight: 500;
    font-size: 16px;
  }
`;

const Wrapper = styled.div`
  padding-top: 30px; /* TODO: change this to main content  */

  .section {
    min-height: 150px;
  }

  .section-title {
    font-weight: normal;
    margin-bottom: 10px;
  }

  .section-action {
    margin-bottom: 10px;
  }

  .payment-list {
    display: initial;

    table {
      &.table th,
      &.table td {
        padding: 5px 15px;
        min-width: 110px;
      }

      a {
        word-break: normal;
      }

      .stripe-btn {
        display: none;
      }
    }

    .btn-icon {
      height: auto;
    }

    .actions {
      position: relative;

      .dropper {
        position: absolute;
        right: 0;
        padding: 8px 8px 12px 8px;
        background-color: #fff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.11);
        z-index: 1000;

        .btn {
          min-width: 150px;

          & ~ .btn {
            margin-top: 5px;
          }
        }
      }
    }

    .payment-footer {
      font-weight: normal;

      > div {
        border-top: 1px solid #151a30;
        margin-top: 5px;
        padding-top: 5px;
      }
    }
  }

  .pay-summary {
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
  }
`;
