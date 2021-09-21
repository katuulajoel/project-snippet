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
} from "../../../../actions/InvoiceActions";
import DateRangeForm from "../../../../components/DateRangeForm";
import ModalHeader from "../../../../components/ModalHeader";
import { openConfirm, openModal } from "../../../../components/utils/modals";
import store from "../../../../store";

const Header = (props) => (
  <ModalHeader
    {...props}
    style={{ paddingBottom: "8px" }}
    options={props.title}
  />
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

export function filterPayment({ start, end }, type, setSummariesRange) {
  openModal(
    <DateRangeForm
      id={`fiter-payment`}
      defaultStart={start}
      defaultEnd={end}
      maxdate={new Date()}
      message={"Select date range for filter"}
    />,
    "",
    true,
    {
      className: "modal-payments",
      ok: `Submit`,
      form: {
        type: "submit",
        form: `fiter-payment`,
      },
    },
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{
        title: `Filter Total ${type === "Payments" ? "Payments" : "Payouts"}`,
      }}
    />,
    false
  ).then((data) => {
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
          type: type === "Payments" ? "sale" : "purchase",
        })
      );
    }
  });
}

export function bulkMarkAsPaid(invoices) {
  openConfirm(
    <div>Are you sure you want to mark all selected as paid?</div>,
    null,
    true,
    { ok: "Yes", cancel: "Cancel" },
    <Header title="Bulk mark as Paid" />
  ).then(() => {
    invoices.forEach((invoice) => {
      store.dispatch(updateInvoice(invoice.id, { paid: true }));
    });
  });
}

export function bulkGenerateInvoice(invoices) {
  openConfirm(
    <div>Are you sure you want to generate invoices for all selected?</div>,
    null,
    true,
    { ok: "Yes", cancel: "Cancel" },
    <Header title="Bulk generate invoices" />
  ).then(() => {
    invoices.forEach((invoice) => {
      store.dispatch(generateInvoice(invoice.id, { paid: true }));
    });
  });
}

export function bulkDeleteInvoice(invoices) {
  openConfirm(
    <div>Are you sure you want to delete all selected?</div>,
    null,
    true,
    { ok: "Yes", cancel: "Cancel" },
    <Header title="Bulk delete invoices" />
  ).then(() => {
    store.dispatch(bulkAction(invoices, "archive"));
  });
}

export function bulkArchiveInvoice(invoices) {
  openConfirm(
    <div>Are you sure you want to archive all selected?</div>,
    null,
    true,
    { ok: "Yes", cancel: "Cancel" },
    <Header title="Bulk archive invoices" />
  ).then(() => {
    store.dispatch(bulkAction(invoices, "delete"));
  });
}
