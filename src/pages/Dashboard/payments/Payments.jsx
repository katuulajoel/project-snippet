/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { DropdownToggle, DropdownMenu } from "reactstrap";

/* -------------------------- Internal dependencies ------------------------- */
import Icon from "../../../components/Icon";
import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
import {
  ENDPOINT_INVOICES,
  INVOICE_TYPE_CREDIT_NOTE,
} from "../../../actions/utils/api";
import { getTableColumns } from "./utils/columns";
import { tableData } from "./utils/row";
import PaymentStatus from "./components/PaymentStatus";
import ActionItem from "./components/ActionItem";
import { showAction } from "./utils/utils";
import {
  GENERATE_INVOICE_ACTION,
  PAY_ACTION,
  MARK_AS_PAID_ACTION,
  ARCHIVE_ACTION,
  EDIT_ACTION,
  DELETE_ACTION,
} from "./utils/constant";

/* --------------------------- Styles dependencies -------------------------- */
import { StyledButtonDropdown } from "./styles";
import DropdownActionItem from "./components/DropdownActionItem";
import ReactTable from "../../../components/ReactTable";
import BulkActions from "./components/BulkActions";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  filter: PropTypes.string,
  invoices: PropTypes.array,
  project: PropTypes.object,
  isSaving: PropTypes.object,
  count: PropTypes.number,
  exportCsv: PropTypes.func,
  onLoadMore: PropTypes.func,
  trackPagination: PropTypes.func,
  currentPage: PropTypes.number,
};

const Payments = (props) => {
  const {
    filter,
    data: invoices,
    isSaving,
    count,
    onLoadMore,
    currentPage,
    project,
  } = props;

  const [open, setopen] = useState(null);
  const [checked, setChecked] = useState([]);

  const checkItem = (item) => {
    let newArr = [];

    if (!checked.includes(item)) {
      newArr = [...checked, item];
    } else {
      newArr = checked.filter((a) => a !== item);
    }
    setChecked(newArr);
  };

  const toggleAction = (invoiceId) => {
    setopen(open === invoiceId ? null : invoiceId);
  };

  const getTableDisplayValue = (cell) => {
    let invoice = cell.value;
    let key = `cell-${cell.column.id}-${cell.row.id}`;

    switch (cell.column.id) {
      case "batch_action": {
        return (
          <td key={key}>
            {!invoice.paid && (
              <input
                type="checkbox"
                className="custom-checkbox"
                onClick={() => checkItem(cell.value)}
              />
            )}
          </td>
        );
      }
      case "created_at": {
        return (
          <td key={key} className="nowrap">
            {moment.utc(invoice).format("DD MMM YYYY")}
          </td>
        );
      }
      case "title": {
        let title = "";
        if (project === null) {
          title =
            (cell.value.project.owner
              ? cell.value.project.owner.display_name
              : "N/A ") + `/ ${cell.value.project.title} / ${cell.value.title}`;
        } else {
          title = cell.value.title;
        }
        return <td key={key}>{title}</td>;
      }
      case "invoice": {
        return (
          <td key={key} className="nowrap">
            {invoice.finalized ? (
              <a
                href={`${ENDPOINT_INVOICES}${invoice.id}/download/?format=pdf`}
                target="_blank"
                rel="noreferrer"
              >
                {invoice.number}
              </a>
            ) : (
              <b>N/A</b>
            )}
          </td>
        );
      }
      case "amount": {
        return (
          <td key={key} className="nowrap">
            {`${invoice.type === INVOICE_TYPE_CREDIT_NOTE ? "-" : ""}€${
              invoice.amount
            }`}
          </td>
        );
      }
      case "due_date": {
        return (
          <td key={key} className="nowrap">
            {moment.utc(invoice.due_at).format("DD MMM YYYY")}
            {new Date(`${invoice.due_at}`) < new Date() && !invoice.paid && (
              <Icon className="danger" name="exclamation-triangle" />
            )}
          </td>
        );
      }
      case "status": {
        return (
          <td key={key} className="nowrap">
            <PaymentStatus invoice={invoice} isSaving={isSaving} />
          </td>
        );
      }
      case "actions": {
        let invoice = cell.value;
        return (
          <td key={key} className="cta">
            <div className="cta-wrapper">
              <ActionItem
                {...props}
                action={GENERATE_INVOICE_ACTION}
                invoice={invoice}
              >
                Generate Invoice
                <Icon name="round-arrow-back-ios" />
              </ActionItem>

              <ActionItem action={PAY_ACTION} invoice={invoice} {...props}>
                Pay
                <Icon name="round-arrow-back-ios" />
              </ActionItem>

              {(showAction(MARK_AS_PAID_ACTION, invoice) ||
                showAction(ARCHIVE_ACTION, invoice) ||
                showAction(EDIT_ACTION, invoice) ||
                showAction(DELETE_ACTION, invoice)) && (
                <StyledButtonDropdown
                  isOpen={open === invoice.id}
                  toggle={() => toggleAction(invoice.id)}
                >
                  <DropdownToggle>
                    <Icon name="dots-horizontal-small" />
                  </DropdownToggle>

                  <DropdownMenu className="dropdown-menu">
                    <DropdownActionItem
                      {...props}
                      action={MARK_AS_PAID_ACTION}
                      invoice={invoice}
                    >
                      <Icon name="circle-check" />
                      &nbsp;&nbsp;&nbsp; Mark as Paid
                    </DropdownActionItem>

                    <DropdownActionItem
                      {...props}
                      action={ARCHIVE_ACTION}
                      invoice={invoice}
                    >
                      <Icon name="archive-outline" />
                      &nbsp;&nbsp;&nbsp; Archive
                    </DropdownActionItem>

                    <DropdownActionItem
                      {...props}
                      action={EDIT_ACTION}
                      invoice={invoice}
                    >
                      <Icon name="circle-edit-outline" />
                      &nbsp;&nbsp;&nbsp; Edit
                    </DropdownActionItem>

                    <DropdownActionItem
                      {...props}
                      action={DELETE_ACTION}
                      invoice={invoice}
                    >
                      <Icon name="delete-outline" />
                      &nbsp;&nbsp;&nbsp; Delete
                    </DropdownActionItem>
                  </DropdownMenu>
                </StyledButtonDropdown>
              )}
            </div>
          </td>
        );
      }
    }
  };

  return (
    <>
      {invoices.length === 0 ? (
        <SummaryPlaceholder
          className="page-filters-pay-summary"
          description={`No payments have been created yet`}
        />
      ) : (
        <div className="section">
          {checked.length !== 0 && ( // TODO: add ....&& isPayAdmin()
            <BulkActions checked={checked} />
          )}
          <div className="table-responsive">
            <ReactTable
              tableData={tableData(invoices)}
              tableColumns={getTableColumns(filter, project)}
              initialPage={currentPage}
              count={count}
              getTableDisplayValue={getTableDisplayValue}
              loadPage={onLoadMore}
            />
          </div>
        </div>
      )}
    </>
  );
};

Payments.propTypes = proptypes;
Payments.defaultProps = {
  project: null,
};

export default Payments;
