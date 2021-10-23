import PropTypes from "prop-types";
import React from "react";
import moment from "moment";
import {
  archiveInvoice,
  generateInvoice as generateInvoiceAction,
  updateInvoice,
  downloadInoicesCsv,
  getInvoiceSummary,
  bulkAction,
} from "../redux/actions/InvoiceActions";
import DateRangeForm from "../components/DateRangeForm";
import ModalHeader from "../components/ModalHeader";
import { openConfirm, openModal } from "./modals";
import store from "../redux/store";
import { isPayAdmin, isClient, isPayAdminOrPM } from "./auth";
import * as actions from "../configs/constants/invoiceConstants";

export const Header = (props) => (
  <ModalHeader
    {...props}
    style={{ paddingBottom: "8px" }}
    options={{ title: props.title }}
  />
);

Header.propTypes = {
  title: PropTypes.string,
};

//TODO: check if use is pay admin to active batch actions, add ...isPayAdmin() && on line 6
export const getTableColumns = (filter, project = null) => [
  ...(!(filter === "archived" || filter === "paid")
    ? [
        {
          Header: " ",
          accessor: "batch_action",
        },
      ]
    : []),
  {
    Header: "Date Created",
    accessor: "created_at",
  },
  {
    Header: `${!project ? "Client / Project / Payment " : ""}Title`,
    accessor: "title",
  },
  {
    Header: "Invoice No.",
    accessor: "invoice",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  ...(filter !== "paid"
    ? [
        {
          Header: "Due Date",
          accessor: "due_date",
        },
        {
          Header: "Status",
          accessor: "status",
        },
        ...(filter !== "archived"
          ? [
              {
                Header: "",
                accessor: "actions",
              },
            ]
          : []),
      ]
    : []),
];

/**
 * Create data source to be use in react table
 * @param {array} data Array of invoice objects
 * @returns array of objects
 */
export const tableData = (data) => [
  ...data?.map((invoice) => {
    let row = {
      batch_action: invoice,
      created_at: invoice.created_at,
      title: { title: invoice.title, project: invoice.project },
      invoice: {
        id: invoice.id,
        number: invoice.number,
        paid: invoice.paid,
        finalized: invoice.finalized,
        last_sent_at: invoice.last_sent_at,
      },
      amount: {
        total_amount: invoice.total_amount,
        amount: invoice.amount,
        type: invoice.type,
      },
      due_date: { due_at: invoice.due_at, paid: invoice.paid },
      status: {
        id: invoice.id,
        due_at: invoice.due_at,
        paid: invoice.paid,
      },
      actions: { ...invoice },
    };
    return row;
  }),
];

function sumInvoiceAmounts(invoices) {
  return invoices
    .map((invoice) => {
      return invoice.amount || 0;
    })
    .reduce((total, number) => {
      return total + Math.round(number * 100) / 100;
    }, 0);
}

/**
 * Group invoices with the same reference into one batch object
 * @param {*} invoices list of invoices
 * @returns returns array of batch objects
 */
export function batchInvoices(invoices) {
  let batchedInvoices = {};
  invoices?.forEach((invoice) => {
    batchedInvoices[invoice.batch_ref] = [
      ...(batchedInvoices[invoice.batch_ref] || []),
      invoice,
    ];
  });

  let batchObjects = [];
  Object.keys(batchedInvoices).map((ref) => {
    let batchObj = {
      ...batchedInvoices[ref][0],
      invoices: batchedInvoices[ref],
    };
    batchObj.ref = ref;
    batchObj.amount = sumInvoiceAmounts(batchedInvoices[ref]);
    batchObjects.push(batchObj);
  });
  return batchObjects;
}

/**
 * Determine whether to show action or not depending on logged in User
 * @param {string} action constants used for the different actions in payments and payouts
 * @param {*} invoice invoice if payments action or invoices if payouts action
 * @returns {boolean} false | true
 */
export const showAction = (action, invoice) => {
  switch (action) {
    case actions.GENERATE_INVOICE_ACTION:
      return (
        isPayAdmin() &&
        !invoice.finalized &&
        !invoice.last_sent_at &&
        !invoice.paid
      );
    case actions.PAY_ACTION:
      return isClient() && invoice.finalized && !invoice.paid;
    case actions.EDIT_ACTION:
    case actions.DELETE_ACTION:
      return (
        isPayAdminOrPM() &&
        !invoice.paid &&
        !invoice.finalized &&
        !invoice.last_sent_at
      );
    case actions.MARK_AS_PAID_ACTION:
      return (
        isPayAdmin() &&
        !invoice.paid &&
        (invoice.finalized || invoice.last_sent_at)
      );
    case actions.APPROVE_BATCH_ACTION:
      return isPayAdmin() && invoice.status !== "approved";
    case actions.ARCHIVE_ACTION:
      return isPayAdmin() && !invoice.paid;
    case actions.EDIT_ACTION_BATCH:
    case actions.DELETE_ACTION_BATCH:
      return (
        isPayAdmin() &&
        !invoice.project.archived &&
        !invoice.status !== "approved" &&
        !invoice.paid
      );
  }
};

/**
 * Determine what function to call depending on the action that been triggered
 * @param {string} action constants used for the different actions in payments and payouts
 * @param {*} data invoice if payments action or invoices if payouts action
 */
export const performAction = (action, data) => {
  switch (action) {
    case actions.GENERATE_INVOICE_ACTION: {
      generateInvoice(data.id);
      break;
    }
    case actions.MARK_AS_PAID_ACTION: {
      markAsPaid(data.id);
      break;
    }
    case actions.ARCHIVE_ACTION: {
      markAsArchived(data.id);
      break;
    }
    case actions.APPROVE_BATCH_ACTION: {
      approvePayout(data);
      break;
    }
  }
};

/**
 * filters to be used as query params
 * @param {*} filter : selected payment status;
 * @returns object keys value pairs
 */
export const getPaymentsFilters = (filter) => {
  switch (filter) {
    case "paid":
      return { paid: "True" };
    case "pending":
      return { paid: "False", overdue: "False" };
    case "overdue":
      return { overdue: "True", paid: "False" };
    case "archived":
      return { archived: "True" };
    default:
      return {};
  }
};

export function generateInvoice(invoiceId) {
  openConfirm({
    message: "Are you sure you want to generate an invoice for this payment?",
    // title: <Header />,
  }).then(() => {
    store.dispatch(generateInvoiceAction(invoiceId));
  });
}

export function markAsPaid(invoiceId) {
  openConfirm({
    message: "Are you sure you want to mark this invoice as paid?",
    title: "Mark as Paid",
  }).then(() => {
    store.dispatch(updateInvoice(invoiceId, { paid: true }));
  });
}

export function markAsArchived(invoiceId) {
  openConfirm({
    message: "Are you sure you want to archive this invoice?",
    title: "Archive invoice",
  }).then(() => {
    store.dispatch(archiveInvoice(invoiceId));
  });
}

export function approvePayout(invoices) {
  openConfirm({
    message: "Are you sure you want to approve this payout?",
    options: { ok: "Approve", cancel: "Cancel" },
    title: "Approve payout",
  }).then(() => {
    invoices.forEach((invoice) => {
      store.dispatch(updateInvoice(invoice.id, { status: "approved" }));
    });
  });
}

export function bulkMarkAsPaid(invoices) {
  openConfirm({
    message: "Are you sure you want to mark all selected as paid?",
    title: "Bulk mark as Paid",
  }).then(() => {
    invoices.forEach((invoice) => {
      store.dispatch(updateInvoice(invoice.id, { paid: true }));
    });
  });
}

export function bulkGenerateInvoice(invoices) {
  openConfirm({
    message: "Are you sure you want to generate invoices for all selected?",
    title: "Bulk generate invoices",
  }).then(() => {
    invoices.forEach((invoice) => {
      store.dispatch(generateInvoiceAction(invoice.id));
    });
  });
}

export function bulkDeleteInvoice(invoices) {
  openConfirm({
    message: "Are you sure you want to delete all selected?",
    title: "Bulk delete invoices",
  }).then(() => {
    store.dispatch(bulkAction(invoices, "delete"));
  });
}

export function bulkArchiveInvoice(invoices) {
  openConfirm({
    message: "Are you sure you want to archive all selected?",
    title: "Bulk archive invoices",
  }).then(() => {
    store.dispatch(bulkAction(invoices, "archive"));
  });
}

export function downloadCsv(filter, type, project = null) {
  openModal({
    body: <DateRangeForm id={`export-form`} />,
    options: {
      className: "modal-payments",
      ok: `Download CSV`,
      form: {
        type: "submit",
        form: `export-form`,
      },
    },
    title: `Export ${type}`,
  }).then((data) => {
    if (data) {
      let params = {};
      if (project) {
        params["project"] = project;
      }

      switch (filter) {
        case "archived":
          params["archived"] = "True";
          params["paid"] = "False";
          break;
        case "all":
          params["archived"] = "False";
          break;
        case "pending":
          params["archived"] = "False";
          params["paid"] = "False";
          params["overdue"] = "False";
          break;
        case "overdue":
          params["archived"] = "False";
          params["paid"] = "False";
          params["overdue"] = "True";
          break;
        case "paid":
          params["archived"] = "False";
          params["paid"] = "True";
      }

      store.dispatch(
        downloadInoicesCsv({
          start: data.start,
          end: data.end,
          type: type === "Payments" ? "sale" : "purchase",
          ...params,
        })
      );
    }
  });
}

export function filterPaymentSummaries(
  { start, end },
  type,
  setSummariesRange
) {
  openModal({
    body: (
      <DateRangeForm
        id={`fiter-payment`}
        defaultStart={start}
        defaultEnd={end}
        maxdate={new Date()}
        message={"Select date range for filter"}
      />
    ),
    options: {
      className: "modal-payments",
      ok: `Submit`,
      form: {
        type: "submit",
        form: `fiter-payment`,
      },
    },
    title: `Filter Total ${type === "Payments" ? "Payments" : "Payouts"}`,
  }).then((data) => {
    if (data) {
      const START = `${moment(data.start).format(
        moment.HTML5_FMT.DATE
      )}T00:00:00`;
      const END = `${moment(data.end).format(moment.HTML5_FMT.DATE)}T23:59:59`;

      setSummariesRange({
        start: START,
        end: END,
      });

      store.dispatch(
        getInvoiceSummary({
          min_date: START,
          max_date: END,
          type: type === "in" ? "sale" : "purchase",
        })
      );
    }
  });
}
