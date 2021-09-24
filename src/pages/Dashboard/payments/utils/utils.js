import {
  isPayAdmin,
  isClient,
  isPayAdminOrPM,
} from "../../../../components/utils/auth";
import * as actions from "./constant"; //TODO: Load just actions needed
import {
  approvePayout,
  generateInvoice,
  markAsArchived,
  markAsPaid,
} from "./paymentActions";

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
