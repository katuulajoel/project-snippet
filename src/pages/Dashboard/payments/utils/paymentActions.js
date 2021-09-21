import PropTypes from "prop-types";
import React from "react";
import {
  archiveInvoice,
  generateInvoice as generateInvoiceAction,
  updateInvoice,
  downloadInoicesCsv,
} from "../../../../actions/InvoiceActions";
import DateRangeForm from "../../../../components/DateRangeForm";
import ModalHeader from "../../../../components/ModalHeader";
import { openConfirm, openModal } from "../../../../components/utils/modals";
import store from "../../../../store";

const Header = ({ title }) => (
  <ModalHeader style={{ paddingBottom: "8px" }} options={title} />
);

Header.propTypes = {
  title: PropTypes.string,
};

export function generateInvoice(invoiceId) {
  openConfirm(
    <div>Are you sure you want to generate an invoice for this payment?</div>,
    null,
    true,
    { ok: "Yes" },
    <Header title="Generate Invoice" />
  ).then(() => {
    store.dispatch(generateInvoiceAction(invoiceId));
  });
}

export function markAsPaid(invoiceId) {
  openConfirm(
    <div>Are you sure you want to mark this invoice as paid?</div>,
    null,
    true,
    { ok: "Yes" },
    <Header title="Mark as Paid" />
  ).then(() => {
    store.dispatch(updateInvoice(invoiceId, { paid: true }));
  });
}

export function markAsArchived(invoiceId) {
  openConfirm(
    <div>Are you sure you want to archive this invoice?</div>,
    null,
    true,
    { ok: "Yes" },
    <Header title="Archive invoice" />
  ).then(() => {
    store.dispatch(archiveInvoice(invoiceId));
  });
}

export function approvePayout(invoices) {
  openConfirm(
    <div>Are you sure you want to approve this payout?</div>,
    null,
    true,
    { ok: "Approve", cancel: "Cancel" },
    <Header title="Approve payout" />
  ).then(() => {
    invoices.forEach((invoice) => {
      store.dispatch(updateInvoice(invoice.id, { status: "approved" }));
    });
  });
}

export function downloadCsv(filter, type) {
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
    <Header title={`Export ${type}`} />,
    false
  ).then((data) => {
    if (data) {
      let params = {};

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
