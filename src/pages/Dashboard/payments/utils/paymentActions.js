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
    options={{ title: props.title }}
  />
);

Header.propTypes = {
  title: PropTypes.string,
};

export function generateInvoice(invoiceId) {
  openConfirm({
    message: "Are you sure you want to generate an invoice for this payment?",
    header: <Header title="Generate Invoice" />,
  }).then(() => {
    store.dispatch(generateInvoiceAction(invoiceId));
  });
}

export function markAsPaid(invoiceId) {
  openConfirm({
    message: "Are you sure you want to mark this invoice as paid?",
    header: <Header title="Mark as Paid" />,
  }).then(() => {
    store.dispatch(updateInvoice(invoiceId, { paid: true }));
  });
}

export function markAsArchived(invoiceId) {
  openConfirm({
    message: "Are you sure you want to archive this invoice?",
    header: <Header title="Archive invoice" />,
  }).then(() => {
    store.dispatch(archiveInvoice(invoiceId));
  });
}

export function approvePayout(invoices) {
  openConfirm({
    message: "Are you sure you want to approve this payout?",
    options: { ok: "Approve", cancel: "Cancel" },
    header: <Header title="Approve payout" />,
  }).then(() => {
    invoices.forEach((invoice) => {
      store.dispatch(updateInvoice(invoice.id, { status: "approved" }));
    });
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
    header: <Header title={`Export ${type}`} />,
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
    header: (
      <Header
        title={`Filter Total ${type === "Payments" ? "Payments" : "Payouts"}`}
      />
    ),
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

export function bulkMarkAsPaid(invoices) {
  openConfirm({
    message: "Are you sure you want to mark all selected as paid?",
    header: <Header title="Bulk mark as Paid" />,
  }).then(() => {
    invoices.forEach((invoice) => {
      store.dispatch(updateInvoice(invoice.id, { paid: true }));
    });
  });
}

export function bulkGenerateInvoice(invoices) {
  openConfirm({
    message: "Are you sure you want to generate invoices for all selected?",
    header: <Header title="Bulk generate invoices" />,
  }).then(() => {
    invoices.forEach((invoice) => {
      store.dispatch(generateInvoiceAction(invoice.id));
    });
  });
}

export function bulkDeleteInvoice(invoices) {
  openConfirm({
    message: "Are you sure you want to delete all selected?",
    header: <Header title="Bulk delete invoices" />,
  }).then(() => {
    store.dispatch(bulkAction(invoices, "delete"));
  });
}

export function bulkArchiveInvoice(invoices) {
  openConfirm({
    message: "Are you sure you want to archive all selected?",
    header: <Header title="Bulk archive invoices" />,
  }).then(() => {
    store.dispatch(bulkAction(invoices, "archive"));
  });
}
