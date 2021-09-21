import PropTypes from "prop-types";
import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const BulkActions = ({ checked }) => {
  let { status } = useParams();
  const canGenerateInvoice = checked.filter(
    (invoice) => !invoice.finalized && !invoice.last_sent_at && !invoice.paid
  ).length;

  const checkIfFinalised = () => {
    if (checked.filter((e) => e.finalized).length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const canMarkAsPaid = () => {
    if (checked.filter((e) => !e.finalized).length > 0) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <ActionSlate className="d-flex mb-3">
      {canMarkAsPaid() && (
        <button className="btn btn-light">
          Mark as Paid ({checked.length})
        </button>
      )}

      {!checkIfFinalised() && canGenerateInvoice > 0 && (
        <button
          className="btn btn-light ml-2"
          disabled={canGenerateInvoice === 0}
        >
          Generate Invoice ({canGenerateInvoice})
        </button>
      )}

      {status !== "archived" && (
        <button className="btn btn-light ml-2">
          Archive ({checked.length})
        </button>
      )}
      {!checkIfFinalised() && (
        <button className="btn btn-light ml-2">
          Delete ({checked.length})
        </button>
      )}
    </ActionSlate>
  );
};

BulkActions.propTypes = {
  checked: PropTypes.array, // TODO:...
};

export const ActionSlate = styled.div`
  button {
    box-shadow: none;
    font-weight: 800;
    border: 1px solid #8590a0;
    border-radius: 1px;
    color: #8590a0;
    padding: 0 10px;
  }
`;

export default BulkActions;
