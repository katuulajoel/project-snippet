/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import Progress from "../../../../components/Progress";

const PaymentStatus = (props) => {
  const { invoice, isSaving } = props;

  if (new Date(`${invoice.due_at}`) < new Date() && !invoice.paid) {
    return <span className="overdue">Overdue</span>;
  }
  if (invoice.paid) {
    return <span className="completed">Paid</span>;
  }
  if (isSaving[invoice.id]) {
    return <Progress message="Processing" />;
  }
  return <span className="pending">Pending</span>;
};

PaymentStatus.propTypes = {
  invoice: PropTypes.shape({
    due_at: PropTypes.string,
    id: PropTypes.string,
    paid: PropTypes.bool,
  }),
  isSaving: PropTypes.any, // TODO: changed this to isMakingRequest
};

export default PaymentStatus;
