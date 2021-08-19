/* eslint-disable no-unused-vars */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";

/* -------------------------- Internel Dependencies ------------------------- */
import { openModal, openConfirm } from "./modals";
//import InvoiceForm from "../dashboard/projects/common/modals/InvoiceForm";
const InvoiceForm = <></>;

import {
  INVOICE_TYPE_CREDIT_NOTE,
  INVOICE_TYPE_PURCHASE,
  INVOICE_TYPE_SALE,
  INVOICE_TYPES,
} from "../../actions/utils/api";
import PaymentOptions from "../dashboard/payments/PaymentOptions";
// import InvoiceDetails from "../dashboard/payments/InvoiceDetails";
import ModalHeader from "../dashboard/projects/common/modals/Header";
import DateRangeForm from "components/dashboard/projects/common/modals/DateRangeForm";
import { isClient, isPayAdmin, isPayAdminOrPM } from "components/utils/auth";
import MakePaymentModal from "components/dashboard/projects/project/payments/components/MakePaymentModal";

export const GENERATE_INVOICE_ACTION = "GENERATE_INVOICE_ACTION";
export const PAY_ACTION = "PAY_ACTION";
export const EDIT_ACTION = "EDIT_ACTION";
export const DELETE_ACTION = "DELETE_ACTION";
export const MARK_AS_PAID_ACTION = "MARK_AS_PAID_ACTION";
export const ARCHIVE_ACTION = "ARCHIVE_ACTION";
/* 
export function filterInvoices(invoices, type) {
  return invoices.filter((invoice) => invoice?.type === type);
}

export function filterMultiInvoicesTypes(invoices, type, type1) {
  // client filters

  return invoices.filter(
    (invoice) => invoice.type === type || invoice.type === type1
  );
}

export function sumInvoices(invoices) {
  return invoices
    .map((invoice) => {
      return invoice.amount || 0;
    })
    .reduce((total, number) => {
      return total + Math.round(number * 100) / 100;
    }, 0);
}

export function getPaidInvoices(invoices, state) {
  return invoices
    .filter((invoice) => {
      return state ? invoice.paid : !invoice.paid;
    })
    .map((invoice) => {
      return invoice.amount || 0;
    })
    .reduce((total, number) => {
      return total + Math.round(number * 100) / 100;
    }, 0);
}

export function batchInvoices(invoices) {
  let batchedInvoices = {};
  invoices.forEach((invoice) => {
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
    batchObj.amount = sumInvoices(batchedInvoices[ref]);
    batchObjects.push(batchObj);
  });
  return batchObjects;
}

export function onCreateInvoice(type, props) {
  const { project, InvoiceActions, selectionKey } = props;

  openModal(
    <InvoiceForm
      id={`${type === INVOICE_TYPE_PURCHASE ? "payout" : "payment"}-form`}
      invoice={{ type }}
      project={project}
    />,
    `Add ${INVOICE_TYPES[type]}`,
    true,
    {
      className: "modal-payments",
      ok: `Save ${type === INVOICE_TYPE_PURCHASE ? "Payout" : "Payment"}`,
      form: {
        type: "submit",
        form: `${type === INVOICE_TYPE_PURCHASE ? "payout" : "payment"}-form`,
      },
    },
    null,
    false
  ).then(
    (data) => {
      if (data.type === INVOICE_TYPE_SALE) {
        InvoiceActions.createInvoice(
          {
            ...data,
            milestone: data.milestone ? { id: data.milestone.id } : null,
            user: {
              id: project.owner ? project.owner.id : project.user.id,
            },
            project: { id: project.id },
          },
          selectionKey
        );
      } else if (data.type === INVOICE_TYPE_CREDIT_NOTE) {
        InvoiceActions.createInvoice(
          {
            ...data,
            milestone: data.milestone ? { id: data.milestone.id } : null,
            user: {
              id: project.owner ? project.owner.id : project.user.id,
            },
            project: { id: project.id },
          },
          selectionKey
        );
      } else if (data.invoice.type === INVOICE_TYPE_PURCHASE) {
        let cleanData = [],
          invoice = data.invoice,
          payouts = data.payouts;
        if (payouts && invoice) {
          Object.keys(payouts).forEach((idx) => {
            let payout = payouts[idx];
            if (payout.user && payout.amount) {
              cleanData.push({
                ...invoice,
                milestone: invoice.milestone
                  ? { id: invoice.milestone.id }
                  : null,
                amount: payout.amount,
                user: { id: payout.user.id },
                project: { id: project.id },
              });
            }
          });
        }
        if (cleanData.length) {
          InvoiceActions.createInvoiceBatch(cleanData, selectionKey);
        }
      }
    },
    () => {}
  );
}

export function openPay(invoice, props) {
  const { InvoiceActions, selectionKey } = props;

  // FIXME: wrong params are being passed here to open modal
  openModal(<PaymentOptions />, "Payment options", true, {
    className: "modal-pay",
  })
    .then((type) => {
      openModal(
        // <InvoiceDetails invoice={invoice} />,
        <></>,
        "Download Invoice",
        true,
        { className: "modal-pay" }
      );
    })
    .catch(() => {});
}

export function onGenerateInvoice(invoiceId, props) {
  const { InvoiceActions, selectionKey } = props;
  openConfirm(
    <div>Are you sure you want to generate an invoice for this payment?</div>,
    null,
    true,
    { ok: "Yes" },
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: "Generate Invoice" }}
    />
  ).then(
    () => {
      InvoiceActions.generateInvoice(invoiceId, selectionKey);
    },
    () => {
      // Nothing
    }
  );
}

export function onUpdateInvoice(invoice, props) {
  let cleanInvoice = {};
  [
    "id",
    "type",
    "title",
    "issued_at",
    "amount",
    "milestone",
    "payment_period",
  ].forEach((key) => {
    cleanInvoice[key] = invoice[key];
  });
  const { project, InvoiceActions, selectionKey } = props;
  openModal(
    <InvoiceForm
      id={`${
        invoice.type === INVOICE_TYPE_PURCHASE ? "payout" : "payment"
      }-form`}
      invoice={cleanInvoice}
      project={project}
    />,
    `Edit ${INVOICE_TYPES[invoice.type]}`,
    true,
    {
      className: "modal-payments",
      ok: `Update ${
        invoice.type === INVOICE_TYPE_PURCHASE ? "Payout" : "Payment"
      }`,
      form: {
        type: "submit",
        form: `${
          invoice.type === INVOICE_TYPE_PURCHASE ? "payout" : "payment"
        }-form`,
      },
    },
    null,
    false
  ).then(
    (data) => {
      if (
        invoice.type === INVOICE_TYPE_SALE ||
        invoice.type === INVOICE_TYPE_CREDIT_NOTE
      ) {
        InvoiceActions.updateInvoice(
          invoice.id,
          {
            ...data,
            milestone: data.milestone ? { id: data.milestone.id } : null,
          },
          selectionKey
        );
      }
    },
    () => {}
  );
}

export function onMarkPaid(invoiceId, props) {
  const { InvoiceActions, selectionKey } = props;
  openConfirm(
    <div>Are you sure you want to mark this invoice as paid?</div>,
    "",
    true,
    { ok: "Yes" },
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: "Mark as Paid" }}
    />
  ).then(
    () => {
      InvoiceActions.updateInvoice(
        invoiceId,
        { paid: true, successMsg: "Invoice marked as paid" },
        selectionKey
      );
    },
    () => {
      // Nothing
    }
  );
}

export function onMarkBatchPaid(batch, props) {
  const { InvoiceActions, selectionKey } = props;
  openConfirm(
    <div>Are you sure you want to mark this payout as paid?</div>,
    "",
    true,
    { ok: "Yes" },
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: "Mark as Paid" }}
    />
  ).then(
    () => {
      batch.invoices.forEach((invoice) => {
        InvoiceActions.updateInvoice(
          invoice.id,
          { paid: true, successMsg: "Payout marked as paid" },
          selectionKey
        );
      });
    },
    () => {
      // Nothing
    }
  );
}

export function onMarkArchived(invoiceId, props) {
  const { InvoiceActions, selectionKey } = props;
  openConfirm(
    <div>Are you sure you want to archive this invoice?</div>,
    "",
    true,
    { ok: "Yes" },
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: "Archive invoice" }}
    />
  ).then(
    () => {
      InvoiceActions.archiveInvoice(
        invoiceId,
        selectionKey,
        "Invoice archived"
      );
    },
    () => {
      // Nothing
    }
  );
}

export function onMarkBatchArchived(batch, props) {
  const { InvoiceActions, selectionKey } = props;
  openConfirm(
    <div>Are you sure you want to archive this payout?</div>,
    "",
    true,
    { ok: "Yes" },
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: "Archive Payout" }}
    />
  ).then(
    () => {
      batch.invoices.forEach((invoice) => {
        InvoiceActions.archiveInvoice(
          invoice.id,
          selectionKey,
          "Payout archived"
        );
      });
    },
    () => {
      // Nothing
    }
  );
}

export function onDeleteInvoice(invoiceId, props) {
  const { InvoiceActions, selectionKey } = props;
  openConfirm(
    <div>Are you sure you want to delete this invoice?</div>,
    "",
    true,
    {
      ok: "Yes",
    },
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: "Delete Payment" }}
    />
  ).then(
    () => {
      InvoiceActions.deleteInvoice(invoiceId, selectionKey);
    },
    () => {
      // Nothing
    }
  );
}

export function onUpdateInvoiceBatch(ref, invoices, props) {
  let invoice = invoices[0];
  let cleanInvoice = {};
  ["type", "title", "issued_at", "milestone"].forEach((key) => {
    cleanInvoice[key] = invoice[key];
  });

  let payouts = {};
  invoices.forEach((item, idx) => {
    payouts[idx] = { id: item.id, user: item.user, amount: item.amount };
  });
  const { project, InvoiceActions, selectionKey } = props;
  openModal(
    <InvoiceForm
      id={`${
        invoice.type === INVOICE_TYPE_PURCHASE ? "payout" : "payment"
      }-form`}
      invoice={cleanInvoice}
      payouts={payouts}
      project={project}
    />,
    `Edit ${invoice.type === INVOICE_TYPE_SALE ? "Payment" : "Payout"}`,
    true,
    {
      className: "modal-payments",
      ok: `Update ${
        invoice.type === INVOICE_TYPE_PURCHASE ? "Payout" : "Payment"
      }`,
      form: {
        type: "submit",
        form: `${
          invoice.type === INVOICE_TYPE_PURCHASE ? "payout" : "payment"
        }-form`,
      },
    },
    null,
    false
  ).then(
    (data) => {
      if (invoice.type === INVOICE_TYPE_PURCHASE) {
        let cleanData = [],
          invoice = data.invoice,
          payouts = data.payouts;

        if (payouts && invoice) {
          Object.keys(payouts).forEach((idx) => {
            let payout = payouts[idx];
            if (payout.user && payout.amount) {
              let payObj = {
                ...invoice,
                milestone: invoice.milestone
                  ? { id: invoice.milestone.id }
                  : null,
                amount: payout.amount,
                user: { id: payout.user.id },
                project: { id: project.id },
              };
              if (payout.id) {
                payObj.id = payout.id;
              }
              payObj.batch_ref = ref;
              cleanData.push(payObj);
            }
          });
        }

        let retainedIds = [];
        if (cleanData.length) {
          cleanData.forEach((item) => {
            if (item.id) {
              retainedIds.push(item.id);
              InvoiceActions.updateInvoice(item.id, item, selectionKey);
            } else {
              InvoiceActions.createInvoice(item, selectionKey);
            }
          });
        }

        invoices.forEach((item) => {
          if (!retainedIds.includes(item.id)) {
            InvoiceActions.deleteInvoice(item.id, selectionKey);
          }
        });
      }
    },
    () => {}
  );
}

export function onDeleteInvoiceBatch(ref, invoices, props) {
  const { InvoiceActions, selectionKey } = props;
  openConfirm(
    <div>Are you sure you want to delete this payout?</div>,
    "",
    true,
    {
      ok: "Yes",
    },
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: "Delete invoice batch" }}
    />
  ).then(
    () => {
      invoices.forEach((invoice) => {
        InvoiceActions.deleteInvoice(invoice.id, selectionKey);
      });
    },
    () => {
      // Nothing
    }
  );
}

export function onApprovePayout(ref, invoices, props) {
  const { InvoiceActions, selectionKey } = props;
  openConfirm(
    <div>Are you sure you want to approve this payout?</div>,
    "",
    true,
    { ok: "Approve", cancel: "Cancel" },
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: "Approve payout" }}
    />
  ).then(
    () => {
      invoices.forEach((invoice) => {
        InvoiceActions.updateInvoice(
          invoice.id,
          { status: "approved" },
          selectionKey
        );
      });
    },
    () => {
      // Nothing
    }
  );
}

export function downloadCsv(filter, type, InvoiceActions, project = null) {
  console.log(filter);
  openModal(
    <DateRangeForm id={`export-form`} />,
    "",
    true,
    {
      className: "modal-payments",
      ok: `Download CSV`,
      form: {
        type: "submit",
        form: `export-form`,
      },
    },
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: `Export ${type}` }}
    />,
    false
  ).then(
    (data) => {
      if (data) {
        let params = {};

        if (project) {
          params["project"] = project;
        }
        if (filter === "archived") {
          params["archived"] = "True";
          params["paid"] = "False";
        } else if (filter === "all") {
          params["archived"] = "False";
        } else if (filter === "pending") {
          params["archived"] = "False";
          params["paid"] = "False";
          params["overdue"] = "False";
        } else if (filter === "overdue") {
          params["archived"] = "False";
          params["paid"] = "False";
          params["overdue"] = "True";
        } else if (filter === "paid") {
          params["archived"] = "False";
          params["paid"] = "True";
        }

        InvoiceActions.downloadInoicesCsv(
          {
            start: data.start,
            end: data.end,
            type: type === "Payments" ? "sale" : "purchase",
            ...params,
          },
          type,
          filter
        );
      }
    },
    () => {
      //
    }
  );
}

export const showAction = (action, invoice) => {
  switch (action) {
    case GENERATE_INVOICE_ACTION:
      return (
        isPayAdmin() &&
        !invoice.finalized &&
        !invoice.last_sent_at &&
        !invoice.paid
      );
    case PAY_ACTION:
      return isClient() && invoice.finalized && !invoice.paid;
    case EDIT_ACTION:
    case DELETE_ACTION:
      return (
        isPayAdminOrPM() &&
        !invoice.paid &&
        !invoice.finalized &&
        !invoice.last_sent_at
      );
    case MARK_AS_PAID_ACTION:
      return (
        isPayAdmin() &&
        !invoice.paid &&
        (invoice.finalized || invoice.last_sent_at)
      );
    case ARCHIVE_ACTION:
      return isPayAdmin() && !invoice.paid;
    default:
      return false;
  }
};

export const performAction = (action, invoice, props) => {
  switch (action) {
    case GENERATE_INVOICE_ACTION: {
      onGenerateInvoice(invoice.id, props);
      break;
    }
    case PAY_ACTION: {
      openModal(<MakePaymentModal invoice={invoice} />, "Make Payment", true, {
        className: "modal-report modal-make-payment",
      });
      break;
    }
    case EDIT_ACTION: {
      onUpdateInvoice(invoice, props);
      break;
    }
    case DELETE_ACTION: {
      onDeleteInvoice(invoice.id, props);
      break;
    }
    case MARK_AS_PAID_ACTION: {
      onMarkPaid(invoice.id, props);
      break;
    }
    case ARCHIVE_ACTION: {
      onMarkArchived(invoice.id, props);
      break;
    }
  }
};
 */
