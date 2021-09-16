import React from "react";
import {
  archiveInvoice,
  generateInvoice as generateInvoiceAction,
  updateInvoice,
} from "../../../../actions/InvoiceActions";
import ModalHeader from "../../../../components/ModalHeader";
import { openConfirm } from "../../../../components/utils/modals";
import store from "../../../../store";

export function generateInvoice(invoiceId) {
  openConfirm(
    <div>Are you sure you want to generate an invoice for this payment?</div>,
    null,
    true,
    { ok: "Yes" },
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: "Generate Invoice" }}
    />
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
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: "Mark as Paid" }}
    />
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
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: "Archive invoice" }}
    />
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
    <ModalHeader
      style={{ paddingBottom: "8px" }}
      options={{ title: "Approve payout" }}
    />
  ).then(() => {
    invoices.forEach((invoice) => {
      store.dispatch(updateInvoice(invoice.id, { status: "approved" }));
    });
  });
}
