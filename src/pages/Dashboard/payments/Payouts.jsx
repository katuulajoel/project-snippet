/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import { DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";

/* -------------------------- Internal dependencies ------------------------- */
import Icon from "../../../components/Icon";
import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
import { generateUserIntials } from "../../../components/utils/stringUtils";
import Progress from "../../../components/Progress";

/* --------------------------- Styles dependencies -------------------------- */
import { StyledButtonDropdown, StyledTable } from "./styles";
import Avatar from "../../../components/Avatar";
import BulkActions from "./components/BulkActions";
import { isDev, isPayAdmin } from "../../../components/utils/auth";
import {
  ENDPOINT_INVOICES,
  INVOICE_TYPE_PURCHASE,
} from "../../../actions/utils/api";
import { batchInvoices, filterInvoices } from "./components/utils";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  invoices: PropTypes.array,
  archived: PropTypes.bool,
  setInvoviceTotals: PropTypes.func,
  filter: PropTypes.string,
  fetchMoreInvoices: PropTypes.func,
  next: PropTypes.string,
};

const Payouts = (props) => {
  const { data: invoices, filter, hasMore, fetchMoreInvoices, next } = props;
  let payouts = filterInvoices(invoices, INVOICE_TYPE_PURCHASE);

  let batchPayouts = batchInvoices(payouts);

  const [open, setopen] = useState(null);
  const [checked, setChecked] = useState([]);

  const toggleAction = (invoiceId) => {
    setopen(open === invoiceId ? null : invoiceId);
  };

  const checkItem = (item) => {
    let newArr = [];
    let hasItem = checked.filter((a) => a.id === item.id).length > 0;

    if (!hasItem) {
      newArr = [...checked, item];
    } else {
      newArr = checked.filter((a) => a.id !== item.id);
    }
    setChecked(newArr);
  };

  return (
    <>
      {invoices.length === 0 || !batchPayouts.length ? (
        <SummaryPlaceholder
          className="page-filters-pay-summary"
          description={`No payouts have been created yet`}
        />
      ) : (
        <InfiniteScroll
          dataLength={invoices.length}
          next={fetchMoreInvoices(next)}
          hasMore={hasMore}
          loader={<Progress />}
          scrollableTarget="main-content"
        >
          <div className="section">
            {checked.length !== 0 && ( // TODO: add ....&& isPayAdmin()
              <BulkActions checked={checked} />
            )}
            <div
              className="table-responsive"
              style={{
                display: "block",
                overflowX: "auto",
                whiteSpace: "nowrap",
              }}
            >
              <PayoutStyledTable filter={filter}>
                <thead>
                  <tr>
                    {isPayAdmin() &&
                      !(filter === "archived" || filter === "paid") && (
                        <th></th>
                      )}
                    <th>Date Created</th>
                    <th>Client / Project / Payment Title</th>
                    <th>User</th>
                    <th>Invoice No.</th>
                    <th style={{ whiteSpace: "nowrap" }}>Amount</th>
                    {filter !== "paid" ? (
                      <>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th />
                      </>
                    ) : null}
                  </tr>
                </thead>
                <tbody>
                  {batchPayouts.map((batch) => {
                    return (
                      <tr key={batch.id}>
                        {isPayAdmin() &&
                          !(filter === "archived" || filter === "paid") && (
                            <td>
                              {!(batch.paid || batch.status === "approved") && (
                                <input
                                  type="checkbox"
                                  className="custom-checkbox"
                                  value={batch}
                                  onClick={() => checkItem(batch)}
                                />
                              )}
                            </td>
                          )}
                        <td
                          style={{
                            whiteSpace: "nowrap",
                          }}
                        >
                          {moment
                            .utc(batch.invoices[0].issued_at)
                            .format("DD MMM YYYY")}
                        </td>
                        <td>
                          <p className="payout-title">
                            {batch.project && batch.project.owner
                              ? batch.project.owner.display_name
                              : "N/A"}{" "}
                            / {batch.project && batch.project.title} /{" "}
                            {batch.title}
                          </p>
                        </td>
                        <td
                          style={{
                            minWidth: "165px",
                          }}
                        >
                          {batch.invoices.map((item) => {
                            return (
                              <div
                                key={item.id}
                                style={{
                                  display: "flex",
                                  marginBottom: "8px",
                                  alignItems: "center",
                                }}
                              >
                                <Avatar
                                  image={item.user.avatar_url}
                                  initials={generateUserIntials(item.user)}
                                  size="dash"
                                  className={
                                    !item.user.avatar_url && "avatar-initials"
                                  }
                                />
                                {item.user.display_name}
                              </div>
                            );
                          })}
                        </td>
                        <td>
                          {batch.invoices.map((item) => {
                            return (
                              <div
                                key={item.id}
                                style={{
                                  whiteSpace: "nowrap",
                                }}
                              >
                                <a
                                  href={`${ENDPOINT_INVOICES}${item.id}/download/?format=pdf`}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {item.number}
                                </a>
                              </div>
                            );
                          })}
                        </td>
                        <td
                          style={{
                            whiteSpace: "nowrap",
                          }}
                        >
                          {batch.invoices.map((item) => {
                            return (
                              <div key={item.id}>
                                €{item.amount}{" "}
                                {batch.paid && !item.paid && (
                                  <Icon
                                    className="danger"
                                    name="exclamation-triangle"
                                  />
                                )}
                              </div>
                            );
                          })}
                          {isDev() ? null : (
                            <div className="subtotal">€{batch.amount}</div>
                          )}
                        </td>
                        {filter !== "paid" ? (
                          <>
                            <td
                              style={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {moment.utc(batch.due_at).format("DD MMM YYYY")}

                              {new Date(`${batch.due_at}`) < new Date() &&
                              !batch.paid &&
                              batch.status !== "approved" ? (
                                <Icon
                                  className="danger"
                                  name="exclamation-triangle"
                                />
                              ) : null}
                            </td>
                            <td>
                              {(new Date(`${batch.due_at}`) < new Date() &&
                                batch.status === "approved" &&
                                !batch.paid) ||
                              (!batch.paid && batch.status === "approved") ? (
                                <span className="pending">Processing</span>
                              ) : batch.paid ? (
                                <span className="completed">Paid</span>
                              ) : new Date(`${batch.due_at}`) < new Date() &&
                                !batch.paid ? (
                                <span className="overdue">Overdue</span>
                              ) : (
                                <span className="pending">Pending</span>
                              )}
                            </td>
                            <td className="cta">
                              {isPayAdmin() &&
                              batch.project &&
                              !batch.project.archived &&
                              !batch.paid &&
                              batch.status !== "approved" ? (
                                <div className="cta-wrapper">
                                  {isPayAdmin() && !batch.paid ? (
                                    <>
                                      <a
                                        href="#"
                                        onClick={() => {
                                          // ...
                                        }}
                                      >
                                        Approve
                                        <Icon
                                          name="round-arrow-back-ios"
                                          size="sm"
                                        />
                                      </a>
                                    </>
                                  ) : null}

                                  <StyledButtonDropdown
                                    isOpen={open === batch.ref}
                                    toggle={() => toggleAction(batch.ref)}
                                  >
                                    <DropdownToggle>
                                      <Icon name="dots-horizontal-small" />
                                    </DropdownToggle>

                                    <DropdownMenu className="dropdown-menu">
                                      <DropdownItem
                                        onClick={() => {
                                          // ...
                                        }}
                                        className="dropdown-item"
                                      >
                                        <Icon name="circle-edit-outline" />
                                        &nbsp;&nbsp;&nbsp; Edit
                                      </DropdownItem>

                                      <DropdownItem
                                        className="dropdown-item"
                                        onClick={() => {
                                          // ...
                                        }}
                                      >
                                        <Icon name="delete-outline" />
                                        &nbsp;&nbsp;&nbsp; Delete
                                      </DropdownItem>
                                    </DropdownMenu>
                                  </StyledButtonDropdown>
                                </div>
                              ) : null}
                            </td>
                          </>
                        ) : null}
                      </tr>
                    );
                  })}
                </tbody>
              </PayoutStyledTable>
            </div>
          </div>
        </InfiniteScroll>
      )}
    </>
  );
};

const PayoutStyledTable = styled(StyledTable)`
  thead tr {
    th:nth-last-child(2) {
      width: 170px;
    }
    th:last-child {
      width: fit-content;
    }
  }

  tbody tr {
    td {
      padding: 16px 10px;
      i.danger {
        color: #da3451;
      }
      .payout-title {
        margin-bottom: 0;
        min-width: 300px;
        display: inline-block;
        white-space: break-spaces;
      }
    }
    td:last-child {
      padding-right: 24px;
      display: ${(props) => (props.filter === "paid" ? "revert;" : "flex;")};
      ${(props) => (props.filter === "paid" ? "flex-direction: column" : null)};
      ${(props) => (props.filter === "paid" ? "padding-top: 35px;" : null)};
    }
    td:nth-last-child(3) {
      padding-top: 16px !important;
    }
    td:first-child {
      padding-left: 24px;
    }
    td:nth-last-child(3) {
      padding-top: 40px;
    }
  }
`;

Payouts.propTypes = proptypes;

export default Payouts;
