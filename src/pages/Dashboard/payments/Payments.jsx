/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import styled from "styled-components";
import { DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { useTable, usePagination } from "react-table";

/* -------------------------- Internal dependencies ------------------------- */
import Icon from "../../../components/Icon";
import Progress from "../../../components/Progress";
import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
/* import {
  sumInvoices,
  filterInvoices,
  onGenerateInvoice,
  onUpdateInvoice,
  onMarkPaid,
  onMarkArchived,
  onDeleteInvoice,
  getPaidInvoices,
} from "../../utils/payments"; */
import {
  ENDPOINT_INVOICES,
  INVOICE_TYPE_CREDIT_NOTE,
} from "../../../actions/utils/api";

import { isAdmin, isClient, isPayAdmin } from "../../../components/utils/auth";

import PaginationWrapper from "../../../components/Pagination";
// import ModalHeader from "../projects/common/modals/Header";

/* --------------------------- Styles dependencies -------------------------- */
import { StyledButtonDropdown, StyledTable } from "./styles";
// import MakePaymentModal from "../projects/project/payments/components/MakePaymentModal";
// import { openConfirm, openModal } from "components/core/utils/modals";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  filter: PropTypes.string,
  invoices: PropTypes.array,
  project: PropTypes.object,
  isSaving: PropTypes.object,
  setInvoviceTotals: PropTypes.func,
  count: PropTypes.number,
  exportCsv: PropTypes.func,
  onLoadMore: PropTypes.func,
  trackPagination: PropTypes.func,
  lastPageIndex: PropTypes.number,
};

const Payments = (props) => {
  const {
    filter,
    data,
    isSaving,
    setInvoviceTotals,
    match,
    count,
    onLoadMore,
    trackPagination,
    lastPageIndex,
  } = props;
  // let credi_nota = filterInvoices(invoices, INVOICE_TYPE_CREDIT_NOTE);
  let credi_nota = [];

  const [open, setopen] = useState(null);
  const [checked, setChecked] = useState([]);

  const canGenerateInvoice = checked.filter(
    (invoice) => !invoice.finalized && !invoice.last_sent_at && !invoice.paid
  ).length;

  const checkedItems = checked.map((invoice) => {
    return invoice?.id;
  });

  const sumInvoices = () => {
    return 0;
  };

  const getPaidInvoices = () => {
    return 0;
  };

  useEffect(() => {
    setInvoviceTotals({
      export: {
        filter: match.params.filter,
        type: "Payments",
      },
      title: "Payments",
      total: !data.length
        ? "€0.00"
        : data.length
        ? `€${(sumInvoices(data) - sumInvoices(credi_nota)).toFixed(2)}`
        : "€0.00",
      paid: !data.length
        ? "€0.00"
        : data.length
        ? `€${getPaidInvoices(data, true).toFixed(2)}`
        : "€0.00",
      unpaid: !data.length
        ? "€0.00"
        : data.length
        ? `€${(getPaidInvoices(data, false) - sumInvoices(credi_nota)).toFixed(
            2
          )}`
        : "€0.00",
    });
  }, []);

  const checkItem = (item) => {
    let newArr = [];

    if (!checked.includes(item)) {
      newArr = [...checked, item];
    } else {
      newArr = checked.filter((a) => a !== item);
    }
    setChecked(newArr);
  };

  const toggleAction = (invoiceId) => {
    setopen(open === invoiceId ? null : invoiceId);
  };
  useEffect(() => {
    setInvoviceTotals({
      export: {
        filter: match.params.filter,
        type: "Payments",
      },
      title: "Payments",
    });
  }, []);

  /* const pay = (invoice) => {
    openModal(<MakePaymentModal invoice={invoice} />, "Make Payment", true, {
      className: "modal-report modal-make-payment",
    });
  }; */

  const pay = () => {
    return;
  };

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

  /* const confirmAction = (title, action, description) => {
    openConfirm(
      <div>{description}</div>,
      "",
      true,
      { ok: "Approve", cancel: "Cancel" },
      <ModalHeader
        style={{ paddingBottom: "8px" }}
        options={{ title: title }}
      />
    ).then(
      () => {
        action();
      },
      () => {
        // Nothing
      }
    );
  }; */
  const confirmAction = () => {
    return;
  };

  const tableData = useMemo(
    () => [
      ...data?.map((invoice) => {
        let row = {
          batch_action: invoice,
          created_at: invoice.created_at,
          title: { title: invoice.title, project: invoice.project },
          invoice: {
            id: invoice.id,
            number: invoice.number,
            paid: invoice.paid,
            finalized: invoice.finalized,
            last_sent_at: invoice.last_sent_at,
          },
          amount: {
            total_amount: invoice.total_amount,
            amount: invoice.amount,
            type: invoice.type,
          },
          due_date: { due_at: invoice.due_at, paid: invoice.paid },
          status: {
            id: invoice.id,
            due_at: invoice.due_at,
            paid: invoice.paid,
          },
          actions: { ...invoice },
        };
        return row;
      }),
    ],
    []
  );

  const columns = useMemo(
    () => [
      ...(isPayAdmin() && !(filter === "archived" || filter === "paid")
        ? [
            {
              Header: " ",
              accessor: "batch_action",
            },
          ]
        : []),
      {
        Header: "Date Created",
        accessor: "created_at",
      },
      {
        Header: "Client / Project / Payment Title",
        accessor: "title",
      },
      {
        Header: "Invoice No.",
        accessor: "invoice",
      },
      {
        Header: "Amount",
        accessor: "amount",
      },
      ...(filter !== "paid"
        ? [
            {
              Header: "Due Date",
              accessor: "due_date",
            },
            {
              Header: "Status",
              accessor: "status",
            },
            ...(filter !== "archived"
              ? [
                  {
                    Header: "",
                    accessor: "actions",
                  },
                ]
              : []),
          ]
        : []),
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data: tableData,
      initialState: {
        pageIndex: lastPageIndex,
      },
      manualPagination: true,
      pageCount: Math.ceil(count / 20),
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = tableInstance;

  useEffect(() => {
    return () => {
      trackPagination(tableInstance.state.pageIndex);
    };
  }, []);

  const getTableDisplayValue = (cell) => {
    switch (cell.column.id) {
      case "batch_action": {
        let invoice = cell.value;
        return (
          <td key={`cell-${cell.column.id}-${cell.row.id}`}>
            {!invoice.paid && (
              <input
                type="checkbox"
                className="custom-checkbox"
                value={cell.value}
                onClick={() => checkItem(cell.value)}
              />
            )}
          </td>
        );
      }
      case "created_at": {
        let created_at = cell.value;
        return (
          <td
            key={`cell-${cell.column.id}-${cell.row.id}`}
            style={{ whiteSpace: "nowrap" }}
          >
            {moment.utc(created_at).format("DD MMM YYYY")}
          </td>
        );
      }
      case "title":
        return (
          <td key={`cell-${cell.column.id}-${cell.row.id}`}>
            {cell.value.project.owner
              ? cell.value.project.owner.display_name
              : "N/A"}{" "}
            / {cell.value.project.title} / {cell.value.title}
          </td>
        );
      case "invoice": {
        let invoice = cell.value;
        return (
          <td
            key={`cell-${cell.column.id}-${cell.row.id}`}
            style={{ whiteSpace: "nowrap" }}
          >
            {invoice.number ? (
              <a
                href={`${ENDPOINT_INVOICES}${invoice.id}/download/?format=pdf`}
                target="_blank"
                rel="noreferrer"
              >
                {invoice.number}
              </a>
            ) : (
              <b>N/A</b>
            )}
          </td>
        );
      }
      case "amount": {
        let invoice = cell.value;
        return (
          <td
            key={`cell-${cell.column.id}-${cell.row.id}`}
            style={{ whiteSpace: "nowrap" }}
          >
            {`${invoice.type === INVOICE_TYPE_CREDIT_NOTE ? "-" : ""}€${
              invoice.amount
            }`}
          </td>
        );
      }
      case "due_date": {
        let invoice = cell.value;
        return (
          <td
            key={`cell-${cell.column.id}-${cell.row.id}`}
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {moment.utc(invoice.due_at).format("DD MMM YYYY")}

            {new Date(`${invoice.due_at}`) < new Date() && !invoice.paid ? (
              <Icon className="danger" name="exclamation-triangle" />
            ) : null}
          </td>
        );
      }
      case "status": {
        let invoice = cell.value;
        return (
          <td
            key={`cell-${cell.column.id}-${cell.row.id}`}
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {new Date(`${invoice.due_at}`) < new Date() && !invoice.paid ? (
              <span className="overdue">Overdue</span>
            ) : invoice.paid ? (
              <span className="completed">Paid</span>
            ) : isSaving[invoice.id] ? (
              <Progress message="Processing" />
            ) : (
              <span className="pending">Pending</span>
            )}
          </td>
        );
      }
      case "actions": {
        let invoice = cell.value;
        return (
          <td key={`cell-${cell.column.id}-${cell.row.id}`} className="cta">
            <div className="cta-wrapper">
              {isPayAdmin() &&
              !invoice.finalized &&
              !invoice.last_sent_at &&
              !invoice.paid ? (
                <>
                  <a
                    href="#"
                    onClick={() => {
                      // onGenerateInvoice(invoice.id, props);
                    }}
                  >
                    Generate Invoice
                    <Icon name="round-arrow-back-ios" size="sm" />
                  </a>
                </>
              ) : null}

              {isClient() && invoice.finalized && !invoice.paid ? (
                <>
                  <a
                    style={{
                      paddingRight: "0px",
                    }}
                    href="#"
                    onClick={() => {
                      pay(invoice);
                    }}
                  >
                    Pay
                    <Icon name="round-arrow-back-ios" size="sm" />
                  </a>
                </>
              ) : null}

              {isAdmin() && !invoice.paid ? (
                <StyledButtonDropdown
                  isOpen={open === invoice.id}
                  toggle={() => toggleAction(invoice.id)}
                >
                  <DropdownToggle>
                    <Icon name="dots-horizontal-small" />
                  </DropdownToggle>

                  <DropdownMenu className="dropdown-menu">
                    {isPayAdmin() && !invoice.paid ? (
                      <>
                        {invoice.finalized || invoice.last_sent_at ? (
                          <DropdownItem
                            className="dropdown-item"
                            onClick={() => {
                              toggleAction(invoice.id);
                              // onMarkPaid(invoice.id, props);
                            }}
                          >
                            <Icon name="circle-check" />
                            &nbsp;&nbsp;&nbsp; Mark as Paid
                          </DropdownItem>
                        ) : null}
                        <DropdownItem
                          className="dropdown-item"
                          onClick={() => {
                            toggleAction(invoice.id);
                            // onMarkArchived(invoice.id, props);
                          }}
                        >
                          <Icon name="archive-outline" />
                          &nbsp;&nbsp;&nbsp; Archive
                        </DropdownItem>
                      </>
                    ) : null}

                    {isAdmin() &&
                    !invoice.finalized &&
                    !invoice.last_sent_at ? (
                      <DropdownItem
                        onClick={() => {
                          toggleAction(invoice.id);
                          // onUpdateInvoice(invoice, props);
                        }}
                        className="dropdown-item"
                      >
                        <Icon name="circle-edit-outline" />
                        &nbsp;&nbsp;&nbsp; Edit
                      </DropdownItem>
                    ) : null}

                    {isPayAdmin() && !invoice.paid ? (
                      !invoice.finalized && !invoice.last_sent_at ? (
                        <DropdownItem
                          className="dropdown-item"
                          onClick={() => {
                            toggleAction(invoice.id);
                            // onDeleteInvoice(invoice.id, props);
                          }}
                        >
                          <Icon name="delete-outline" />
                          &nbsp;&nbsp;&nbsp; Delete
                        </DropdownItem>
                      ) : null
                    ) : null}
                  </DropdownMenu>
                </StyledButtonDropdown>
              ) : null}
            </div>
          </td>
        );
      }
      default:
        return null;
    }
  };

  return (
    <>
      {data.length === 0 ? (
        <SummaryPlaceholder
          className="page-filters-pay-summary"
          description={`No payments have been created yet`}
        />
      ) : (
        <div className="section">
          {checked.length !== 0 && isPayAdmin() && (
            <ActionSlate className="d-flex mb-3">
              {canMarkAsPaid() && (
                <button
                  className="btn btn-light"
                  onClick={() =>
                    confirmAction(
                      "Mark as Paid",
                      () => {
                        checked.map((invoice) =>
                          props.InvoiceActions.updateInvoice(
                            invoice.id,
                            {
                              paid: true,
                              successMsg: "Invoice marked as paid",
                            },
                            props.selectionKey
                          )
                        );
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
                        checked.map((invoice) =>
                          props.InvoiceActions.generateInvoice(
                            invoice.id,
                            props.selectionKey
                          )
                        );
                      },
                      "Are you sure you want to generate invoices for all selected?"
                    )
                  }
                  disabled={canGenerateInvoice === 0}
                >
                  Generate Invoice ({canGenerateInvoice})
                </button>
              )}

              {match.params.filter !== "archived" && (
                <button
                  className="btn btn-light ml-2"
                  onClick={() =>
                    confirmAction(
                      "Archive",
                      () => {
                        props.InvoiceActions.bulkAction(
                          checkedItems,
                          "archive",
                          props.selectionKey
                        );
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
                        props.InvoiceActions.bulkAction(
                          checkedItems,
                          "delete",
                          props.selectionKey
                        );
                      },
                      "Are you sure you want to delete all selected?"
                    )
                  }
                >
                  Delete ({checked.length})
                </button>
              )}
            </ActionSlate>
          )}
          <div className="table-responsive">
            <PaymentStyledTable filter={filter} {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup, i) => (
                  <tr
                    key={`header-${i}`}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column, n) => (
                      <th key={`column-${n}`} {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr key={`row-${i}`} {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return getTableDisplayValue(cell);
                      })}
                    </tr>
                  );
                })}
                <TableFooter>
                  <td colSpan={filter !== "paid" ? "8" : "5"}>
                    <div>
                      <span>
                        Showing <b>{data.length}</b> out of <b>{count}</b> items
                      </span>

                      <PaginationWrapper
                        onPageChange={gotoPage}
                        canPreviousPage={canPreviousPage}
                        canNextPage={canNextPage}
                        nextPage={nextPage}
                        previousPage={previousPage}
                        pages={pageCount}
                        page={pageIndex}
                        loadMore={onLoadMore}
                      />
                    </div>
                  </td>
                </TableFooter>
              </tbody>
            </PaymentStyledTable>
          </div>
        </div>
      )}
    </>
  );
};

const PaymentStyledTable = styled(StyledTable)`
  tbody tr td:last-child {
    display: ${(props) => (props.filter === "paid" ? "revert;" : "flex;")};
  }
`;

const TableFooter = styled.tr`
  td {
    display: table-cell !important;
    div {
      display: flex;
      font-size: 14px;
      line-height: 21px;
      justify-content: space-between;

      span {
        color: #3e4857;
        align-self: center;
        padding-left: 0px;
      }

      > nav ul {
        margin: 0;
      }
    }
  }
`;

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
Payments.propTypes = proptypes;

export default Payments;
