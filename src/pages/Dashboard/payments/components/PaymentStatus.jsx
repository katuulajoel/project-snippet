/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";

export const BatchStatus = (props) => {
  const { batch } = props;
  if (
    (new Date(`${batch.due_at}`) < new Date() &&
      batch.status === "approved" &&
      !batch.paid) ||
    (!batch.paid && batch.status === "approved")
  ) {
    return <span className="pending">Processing</span>;
  }
  if (new Date(`${batch.due_at}`) < new Date() && !batch.paid) {
    return <span className="overdue">Overdue</span>;
  }
  if (batch.paid) {
    return <span className="completed">Paid</span>;
  }
  return <span className="pending">Pending</span>;
};

BatchStatus.propTypes = {
  batch: PropTypes.shape({
    due_at: PropTypes.string,
    paid: PropTypes.bool,
    status: PropTypes.string,
  }),
};

const PaymentStatus = (props) => {
  const { invoice } = props;

  if (new Date(`${invoice.due_at}`) < new Date() && !invoice.paid) {
    return <span className="overdue">Overdue</span>;
  }
  if (invoice.paid) {
    return <span className="completed">Paid</span>;
  }
  return <span className="pending">Pending</span>;
};

PaymentStatus.propTypes = {
  invoice: PropTypes.shape({
    due_at: PropTypes.string,
    paid: PropTypes.bool,
  }),
};

export default PaymentStatus;
