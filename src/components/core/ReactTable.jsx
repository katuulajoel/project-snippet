/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useMemo, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import styled from "styled-components";

import { StyledTable } from "../dashboard/styles";
import PaginationWrapper from "./Pagination";

export const PAGINNATION_COUNT = 20;

const ReactTable = (props) => {
  const {
    tableData,
    tableColumns,
    lastPageIndex,
    count,
    getTableDisplayValue,
    onLoadMore,
    items,
    getTablePageIndex,
  } = props;

  const data = useMemo(() => tableData, []);

  const columns = useMemo(() => tableColumns, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: lastPageIndex,
      },
      manualPagination: true,
      pageCount: Math.ceil(count / PAGINNATION_COUNT),
    },
    usePagination
  );

  useEffect(() => {
    getTablePageIndex(tableInstance.state.pageIndex);
  }, []);

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
          <td colSpan="6">
            <div>
              <span>
                Showing <b>{items.length}</b> out of <b>{count}</b> items
              </span>

              <PaginationWrapper
                onPageChange={gotoPage}
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                nextPage={nextPage}
                previousPage={previousPage}
                pageIndex={pageIndex}
                pages={pageCount}
                page={pageIndex}
                loadMore={onLoadMore}
              />
            </div>
          </td>
        </TableFooter>
      </tbody>
    </StyledTable>
  );
};

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
