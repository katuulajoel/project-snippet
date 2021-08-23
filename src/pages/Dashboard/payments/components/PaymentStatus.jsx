/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
/* import React from "react";

import Progress from "../../../core/Progress";

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

export default PaymentStatus; */
