/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import { DropdownToggle, DropdownMenu } from "reactstrap";
import InfiniteScroll from "react-infinite-scroll-component";

/* -------------------------- Internal dependencies ------------------------- */
import Icon from "../../../components/Icon";
import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
import { generateUserIntials } from "../../../utils/stringUtils";
import Progress from "../../../components/Progress";

/* --------------------------- Styles dependencies -------------------------- */
import { StyledButtonDropdown, StyledTable } from "./styles";
import Avatar from "../../../components/Avatar";
import BulkActions from "./components/BulkActions";
import { isDev, isPayAdmin, isPMAndHasProjectAcess } from "../../../utils/auth";
import { ENDPOINT_INVOICES } from "../../../utils/api";
import { batchInvoices, showAction } from "../../../utils/invoiceUtils";
import {
  APPROVE_BATCH_ACTION,
  EDIT_ACTION_BATCH,
  DELETE_ACTION_BATCH,
} from "../../../configs/constants/invoiceConstants";
import { BatchStatus } from "./components/PaymentStatus";
import ActionItem from "./components/ActionItem";
import DropdownActionItem from "./components/DropdownActionItem";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  invoices: PropTypes.array,
  archived: PropTypes.bool,
  setInvoviceTotals: PropTypes.func,
  filter: PropTypes.string,
  onLoadMore: PropTypes.func,
  next: PropTypes.string,
  project: PropTypes.object,
  setcreateAction: PropTypes.func,
};

const Payouts = (props) => {
  const {
    data: invoices,
    filter,
    onLoadMore,
    next,
    project,
    setcreateAction,
  } = props;

  let batchPayouts = batchInvoices(invoices);

  const [open, setopen] = useState(null);
  const [checked, setChecked] = useState([]);

  useEffect(() => {
    if (setcreateAction)
      setcreateAction({
        ...((isPayAdmin() || isPMAndHasProjectAcess(props.project)) &&
        !project.archived
          ? {
              visibility: true,
              add: [
                {
                  title: "Add New Payout ",
                  action: () => {}, // TODO: (@katuula) onCreateInvoice(INVOICE_TYPE_PURCHASE, props)
                },
              ],
            }
          : { visibility: false }),
      });
  }, []);

  const toggleAction = (invoiceId) => {
    setopen(open === invoiceId ? null : invoiceId);
  };

  const checkItem = (item) => {
    let newArr = [];

    if (!checked.some((e) => e.id === item.id)) {
      newArr = [...checked, item];
    } else {
      newArr = checked.filter((a) => a.id !== item.id);
    }
    setChecked(newArr);
  };

  return invoices.length === 0 ? (
    <SummaryPlaceholder
      className="page-filters-pay-summary"
      description={`No payouts have been created yet`}
    />
  ) : (
    <InfiniteScroll
      dataLength={invoices.length}
      next={onLoadMore(next)}
      hasMore={next !== null}
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
                {!(filter === "archived" || filter === "paid") && <th></th>}
                <th>Date Created</th>
                <th>Client / Project / Payment Title</th>
                <th>User</th>
                <th>Invoice No.</th>
                <th className="nowrap">Amount</th>
                {filter !== "paid" && (
                  <>
                    <th>Due Date</th>
                    <th>Status</th>
                    <th />
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {batchPayouts.map((batch) => (
                <tr key={batch.id}>
                  {!(filter === "archived" || filter === "paid") && (
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
                  <td className="nowrap">
                    {moment
                      .utc(batch.invoices[0].issued_at)
                      .format("DD MMM YYYY")}
                  </td>
                  <td>
                    <p className="payout-title">
                      {batch.project && batch.project.owner
                        ? batch.project.owner.display_name
                        : "N/A"}{" "}
                      / {batch.project && batch.project.title} / {batch.title}
                    </p>
                  </td>
                  <td className="nowrap">
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
                            image={item.user?.avatar_url}
                            initials={generateUserIntials(item.user)}
                            size="dash"
                            className={
                              !item.user?.avatar_url ? "avatar-initials" : ""
                            }
                          />
                          {item.user?.display_name}
                        </div>
                      );
                    })}
                  </td>
                  <td className="nowrap">
                    {batch.invoices.map((item) => {
                      return (
                        <div key={item.id}>
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
                  <td className="nowrap">
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
                    {!isDev() && (
                      <div className="subtotal">€{batch.amount}</div>
                    )}
                  </td>
                  {filter !== "paid" && (
                    <>
                      <td className="nowrap">
                        {moment.utc(batch.due_at).format("DD MMM YYYY")}

                        {new Date(`${batch.due_at}`) < new Date() &&
                          !batch.paid &&
                          batch.status !== "approved" && (
                            <Icon
                              className="danger"
                              name="exclamation-triangle"
                            />
                          )}
                      </td>
                      <td>
                        <BatchStatus batch={batch} />
                      </td>
                      <td className="cta">
                        <div className="cta-wrapper">
                          <ActionItem
                            {...props}
                            action={APPROVE_BATCH_ACTION}
                            invoice={batch}
                          >
                            Approve
                            <Icon name="round-arrow-back-ios" />
                          </ActionItem>
                          {(showAction(APPROVE_BATCH_ACTION, batch) ||
                            showAction(DELETE_ACTION_BATCH, batch) ||
                            showAction(EDIT_ACTION_BATCH, batch)) && (
                            <StyledButtonDropdown
                              isOpen={open === batch.ref}
                              toggle={() => toggleAction(batch.ref)}
                            >
                              <DropdownToggle>
                                <Icon name="dots-horizontal-small" />
                              </DropdownToggle>

                              <DropdownMenu className="dropdown-menu">
                                <DropdownActionItem
                                  {...props}
                                  action={EDIT_ACTION_BATCH}
                                  invoice={batch}
                                >
                                  <Icon name="circle-edit-outline" />
                                  &nbsp;&nbsp;&nbsp; Edit
                                </DropdownActionItem>

                                <DropdownActionItem
                                  {...props}
                                  action={DELETE_ACTION_BATCH}
                                  invoice={batch}
                                >
                                  <Icon name="delete-outline" />
                                  &nbsp;&nbsp;&nbsp; Delete
                                </DropdownActionItem>
                              </DropdownMenu>
                            </StyledButtonDropdown>
                          )}
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </PayoutStyledTable>
        </div>
      </div>
    </InfiniteScroll>
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
