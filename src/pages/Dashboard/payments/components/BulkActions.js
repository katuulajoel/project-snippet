import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const BulkActions = (checked) => {
  let { status } = useParams();
  const canGenerateInvoice = checked.filter(
    (invoice) => !invoice.finalized && !invoice.last_sent_at && !invoice.paid
  ).length;

  /* const checkedItems = checked.map((invoice) => {
    return invoice?.id;
  }); */

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

  const confirmAction = () => {
    return;
  };
  return (
    <ActionSlate className="d-flex mb-3">
      {canMarkAsPaid() && (
        <button
          className="btn btn-light"
          onClick={() =>
            confirmAction(
              "Mark as Paid",
              () => {
                /*checked.map((invoice) =>
                  props.InvoiceActions.updateInvoice(
                    invoice.id,
                    {
                      paid: true,
                      successMsg: "Invoice marked as paid",
                    },
                    props.selectionKey
                  )
                );*/
              },
              "Are you sure you want to mark all selected as paid?"
            )
          }
        >
          Mark as Paid ({checked.length})
        </button>
      )}

      {!checkIfFinalised() && canGenerateInvoice > 0 && (
        <button
          className="btn btn-light ml-2"
          onClick={() =>
            confirmAction(
              "Generate invoice",
              () => {
                /*checked.map((invoice) =>
                  props.InvoiceActions.generateInvoice(
                    invoice.id,
                    props.selectionKey
                  )
                );*/
              },
              "Are you sure you want to generate invoices for all selected?"
            )
          }
          disabled={canGenerateInvoice === 0}
        >
          Generate Invoice ({canGenerateInvoice})
        </button>
      )}

      {status !== "archived" && (
        <button
          className="btn btn-light ml-2"
          onClick={() =>
            confirmAction(
              "Archive",
              () => {
                /*props.InvoiceActions.bulkAction(
                  checkedItems,
                  "archive",
                  props.selectionKey
                );*/
              },
              "Are you sure you want to archive all selected?"
            )
          }
        >
          Archive ({checked.length})
        </button>
      )}
      {!checkIfFinalised() && (
        <button
          className="btn btn-light ml-2"
          onClick={() =>
            confirmAction(
              "Delete",
              () => {
                /*props.InvoiceActions.bulkAction(
                  checkedItems,
                  "delete",
                  props.selectionKey
                );*/
              },
              "Are you sure you want to delete all selected?"
            )
          }
        >
          Delete ({checked.length})
        </button>
      )}
    </ActionSlate>
  );
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
