/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useMemo, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { Table } from "react-bootstrap";
import styled from "styled-components";

import PaginationWrapper from "./Pagination";

export const PAGINNATION_COUNT = 20; // TODO: move this to environment variables

const ReactTable = (props) => {
  const {
    tableData,
    tableColumns,
    initialPage,
    count,
    getTableDisplayValue,
    loadPage,
  } = props;

  const data = useMemo(() => tableData, []);

  const columns = useMemo(() => tableColumns, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: initialPage,
      },
      manualPagination: true,
      pageCount: Math.ceil(count / PAGINNATION_COUNT),
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
    loadPage(pageIndex);
  }, [pageIndex]);

  return (
    <StyledTable {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr key={`header-${i}`} {...headerGroup.getHeaderGroupProps()}>
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
          <td colSpan="8">
            <div>
              <span>
                Showing <b>{tableData.length}</b> out of <b>{count}</b> items
              </span>

              <PaginationWrapper
                onPageChange={gotoPage}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                nextPage={nextPage}
                previousPage={previousPage}
                pages={pageCount}
                page={pageIndex}
              />
            </div>
          </td>
        </TableFooter>
      </tbody>
    </StyledTable>
  );
};

export const StyledTable = styled(Table)`
  background: #ffffff;
  border: 1px solid #dee2e6;
  box-sizing: border-box;
  border-radius: 6px;
  /* table-layout: fixed; */
  border-collapse: initial;
  border-spacing: 0;
  overflow: hidden;

  thead tr {
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    color: #8f9bb3;
    background: rgba(62, 72, 87, 0.05);
    border-bottom: 1px solid #edf1f7;
    box-sizing: border-box;
    border-radius: 4px 4px 0px 0px;

    th {
      vertical-align: middle;
      padding: 10px;
      border-bottom: 1px solid #edf1f7;
    }
    th:nth-last-child(2) {
      width: 150px;
    }
    th:last-child {
      padding-right: 24px;
    }
    th:first-child {
      padding-left: 24px;
    }
  }

  tbody tr {
    font-size: 16px;
    line-height: 24px;
    text-transform: capitalize;
    color: #3e4857;
    border-bottom: 1px solid #edf1f7;

    td {
      vertical-align: middle;
      padding: 16px 10px;
      width: auto;

      &.nowrap {
        white-space: nowrap;
      }

      a,
      b {
        font-weight: 600;
        color: #3e4857;
        text-decoration: none;
      }

      > i.danger {
        color: #da3451;
        margin-left: 8px;
        vertical-align: baseline;
      }

      .avatar.avatar-dash {
        width: 35px;
        height: 35px;

        &.avatar-initials {
          font-size: 14px;
        }
      }
    }

    td:first-child {
      padding-left: 24px;
    }

    td:last-child {
      display: flex;
      padding-right: 24px;

      &.cta {
        display: table-cell;
        color: #3e4857;
        text-decoration: none;

        &:empty {
          width: fit-content;
        }
        div.cta-wrapper {
          display: flex;
          justify-content: flex-end;
          a {
            white-space: nowrap;
            align-self: center;
            padding-right: 16px;
            i {
              font-size: 15px;
              color: #3e4857;
              margin-left: 8px;
              vertical-align: middle;
            }
          }
          > button {
            align-self: center;
            padding-left: 5px;
            i {
              color: #3e4857;
            }
          }
        }
      }
    }

    span {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      border-radius: 50px;
      padding: 6px 24px;

      &.pending {
        color: #8f9bb3;
        background: rgba(143, 155, 179, 0.05);
        border: 1px solid rgba(143, 155, 179, 0.04);
      }

      &.overdue {
        color: #eb5757;
        background: rgba(235, 87, 87, 0.04);
        border: 1px solid rgba(235, 87, 87, 0.04);
      }

      &.missed {
        color: #3e4857;
        background: rgba(62, 72, 87, 0.04);
        border: 1px solid rgba(62, 72, 87, 0.04);
      }

      &.completed {
        color: #219653;
        background: rgba(33, 150, 83, 0.04);
        border: 1px solid rgba(33, 150, 83, 0.04);
      }
    }
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

      > nav {
        margin: 0 0 0 auto;
      }
    }
  }
`;

export default ReactTable;
