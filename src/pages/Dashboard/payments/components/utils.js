import {
  isPayAdmin,
  isClient,
  isPayAdminOrPM,
} from "../../../../components/utils/auth";

export const GENERATE_INVOICE_ACTION = "GENERATE_INVOICE_ACTION";
export const PAY_ACTION = "PAY_ACTION";
export const EDIT_ACTION = "EDIT_ACTION";
export const DELETE_ACTION = "DELETE_ACTION";
export const MARK_AS_PAID_ACTION = "MARK_AS_PAID_ACTION";
export const ARCHIVE_ACTION = "ARCHIVE_ACTION";

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

// eslint-disable-next-line no-unused-vars
export const performAction = (action, invoice, props) => {
  switch (action) {
    case GENERATE_INVOICE_ACTION: {
      // onGenerateInvoice(invoice.id, props);
      break;
    }
    case PAY_ACTION: {
      /* openModal(<MakePaymentModal invoice={invoice} />, "Make Payment", true, {
        className: "modal-report modal-make-payment",
      }); */
      break;
    }
    case EDIT_ACTION: {
      // onUpdateInvoice(invoice, props);
      break;
    }
    case DELETE_ACTION: {
      // onDeleteInvoice(invoice.id, props);
      break;
    }
    case MARK_AS_PAID_ACTION: {
      // onMarkPaid(invoice.id, props);
      break;
    }
    case ARCHIVE_ACTION: {
      // onMarkArchived(invoice.id, props);
      break;
    }
  }
};
