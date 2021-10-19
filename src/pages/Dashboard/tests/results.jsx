import React, { useMemo, useEffect } from "react";
import { useTable, usePagination, useSortBy } from "react-table";
import styled from "styled-components";
import PropTypes from "prop-types";

import PaginationWrapper from "../../../components/Pagination";
import { StyledTable as Table } from "../styles";
import SummaryPlaceholder from "../../../components/SummaryPlaceholder/SummaryPlaceholder";
import CaretUp from "../../../assets/images/caret-arrow-up.png";
import CaretDown from "../../../assets/images/caret-down.png";
import Select from "../../../components/Select";
import Icon from "../../../components/Icon";
import TableCells from "./TableCells";

const propTypes = {
  testResults: PropTypes.object,
  results: PropTypes.array,
  onLoadMore: PropTypes.func,
  trackPagination: PropTypes.func,
  lastPageIndex: PropTypes.number,
  count: PropTypes.number,
  setlimit: PropTypes.func,
  limit: PropTypes.number,
};

const Results = ({
  testResults: { results },
  count,
  trackPagination,
  lastPageIndex,
  onLoadMore,
  setlimit,
  limit,
}) => {
  const paginationOptions = [
    { value: 20, name: 20 },
    { value: 50, name: 50 },
    { value: 100, name: 100 },
  ];
  const calculateStatus = (value, type = "numeric") => {
    switch (type) {
      case "alpha_numeric":
        if (value === "very_good" || value === "good") {
          return "passed";
        } else if (value === "pass") {
          return "average";
        } else {
          return "failed";
        }
      case "iq":
        if (value < 110) {
          return "failed";
        } else if (value >= 110 && value < 120) {
          return "average";
        } else {
          return "passed";
        }
      default:
        if (value < 50) {
          return "failed";
        } else if (value >= 50 && value < 70) {
          return "average";
        } else {
          return "passed";
        }
    }
  };

  const data = useMemo(
    () => [
      ...results.map((item) => {
        return {
          user: item,
          "coding-tests": [
            ...item.coding_tests.map((test) => {
              return {
                stack: test.skill_name,
                result: test.score,
                status: calculateStatus(test.score),
              };
            }),
          ],
          "comms-check": {
            status: calculateStatus(item.comms_check, "alpha_numeric"),
            result:
              item.comms_check === "very_good" ? "Very good" : item.comms_check,
          },
          "mbti-profile": item.mbti_profile,
          "iq-tests": {
            status: calculateStatus(item.iq_test, "iq"),
            result: item.iq_test,
          },
          "sa-tests": {
            status: calculateStatus(item.sa_test),
            result: item.sa_test,
          },
          "code-of-conduct": {
            status: calculateStatus(item.code_of_conduct),
            result: item.code_of_conduct,
          },
        };
      }),
    ],
    [results]
  );

  const columns = useMemo(
    () => [
      {
        Header: "User",
        accessor: "user", // accessor is the "key" in the data
        sortType: (rowA, rowB, id) => {
          if (
            rowA.original[id].user_obj.display_name >
            rowB.original[id].user_obj.display_name
          )
            return -1;
          if (
            rowB.original[id].user_obj.display_name >
            rowA.original[id].user_obj.display_name
          )
            return 1;
          return 0;
        },
      },
      {
        Header: "Coding Tests",
        accessor: "coding-tests",
        disableSortBy: true,
      },
      {
        Header: "Comms Check",
        accessor: "comms-check",
        sortType: (rowA, rowB, id) => {
          if (rowA.original[id].result > rowB.original[id].result) return -1;
          if (rowB.original[id].result > rowA.original[id].result) return 1;
          return 0;
        },
      },
      {
        Header: "MBTI Profile",
        accessor: "mbti-profile",
        sortType: (rowA, rowB, id) => {
          if (rowA.original[id] > rowB.original[id]) return -1;
          if (rowB.original[id] > rowA.original[id]) return 1;
          return 0;
        },
      },
      {
        Header: "IQ Tests",
        accessor: "iq-tests",
        sortType: (rowA, rowB, id) => {
          if (rowA.original[id].result > rowB.original[id].result) return -1;
          if (rowB.original[id].result > rowA.original[id].result) return 1;
          return 0;
        },
      },
      {
        Header: "SA Tests",
        accessor: "sa-tests",
        sortType: (rowA, rowB, id) => {
          if (rowA.original[id].result > rowB.original[id].result) return -1;
          if (rowB.original[id].result > rowA.original[id].result) return 1;
          return 0;
        },
      },
      {
        Header: "C. Of Conduct",
        accessor: "code-of-conduct",
        sortType: (rowA, rowB, id) => {
          if (rowA.original[id].result > rowB.original[id].result) return -1;
          if (rowB.original[id].result > rowA.original[id].result) return 1;
          return 0;
        },
      },
    ],
    []
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: lastPageIndex,
      },
      manualPagination: true,
      pageCount: Math.ceil(count / limit),
    },
    useSortBy,
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
      trackPagination(pageIndex);
    };
  }, []);

  return (
    <>
      <div className="table-responsive">
        <StyledTable {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, row) => (
              <tr {...headerGroup.getHeaderGroupProps()} key={row}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    key={index}
                  >
                    <div>
                      {column.render("Header")}
                      <div className="caret-group">
                        {column.isSorted ? (
                          <>
                            <img
                              src={CaretUp}
                              className={!column.isSortedDesc ? "active" : ""}
                            />
                            <img
                              src={CaretDown}
                              className={column.isSortedDesc ? "active" : ""}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, index) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()} key={index}>
                  {row.cells.map((cell) => {
                    if (cell.column.id === "user") {
                      return (
                        <th {...cell.getCellProps()}>
                          <TableCells {...cell} row={row} />
                        </th>
                      );
                    } else {
                      return (
                        <td {...cell.getCellProps()}>
                          <TableCells {...cell} row={row} />
                        </td>
                      );
                    }
                  })}
                </tr>
              );
            })}

            {results.length === 0 && (
              <tr>
                <th colSpan="7">
                  <SummaryPlaceholder
                    className="empty-table"
                    description={`No results found`}
                  />
                </th>
              </tr>
            )}
          </tbody>
        </StyledTable>
      </div>
      <TableFooter>
        <span>Showing</span>

        <CustomSelect>
          <Select
            // aria-label="select-pages"
            data-testid="select-pages"
            className="form-control"
            onChange={(value) => {
              setlimit(value);
            }}
            selected={limit}
            options={paginationOptions}
          ></Select>
          <Icon name="rounded-keyboard-arrow-down" size="sm" />
        </CustomSelect>
        <span style={{ marginLeft: "16px" }}>of {count}</span>

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
      </TableFooter>
    </>
  );
};

export const StyledTable = styled(Table)`
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  width: fit-content;
  max-width: 100%;
  overflow: initial;

  th {
    white-space: nowrap;
  }
  td {
    border-right: 1px solid #dee2e6;

    &:last-child {
      border-right: none;
      display: table-cell !important;
    }

    &:first-child {
      white-space: nowrap;
    }

    &:nth-child(2) {
      width: 100%;
      min-width: 380px;
      & > div.result {
        margin: -8px 0 0 -8px;
        justify-content: end;
        span {
          margin: 8px 0 0 8px;
        }
      }
    }

    div.result {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      width: 100%;
      span {
        white-space: nowrap;
      }
    }
  }

  thead th {
    width: 250px;

    & > div {
      display: flex;

      .caret-group {
        width: 10px;
        margin-left: 16px;
        margin: 0 0 0 auto;
        align-self: center;
        display: flex;
        flex-direction: column;
      }
    }
  }

  thead th:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
    background: rgb(245 246 246);
  }

  tbody th {
    border-right: 1px solid #dee2e6;
    position: sticky;
    left: 0;
    background: white;
    z-index: 1;

    > div {
      display: flex;
      align-items: center;

      .edit-action {
        margin: 0 0 0 auto;
        .btn-edit {
          color: #8f9bb3;
          visibility: hidden;
        }
      }

      &:hover .edit-action .btn-edit {
        visibility: visible;
      }
    }
  }

  span {
    color: #fff;

    &.passed {
      background: #219653;
    }
    &.failed {
      background: #eb5757;
    }
    &.average {
      background: #f2994a;
    }
    &.none {
      border: 1px solid #8f9bb3;
      color: #151a30;
    }
  }

  .caret-group {
    display: flex;

    img {
      width: 10px;
      height: 10px;
      opacity: 0.3;

      &.active {
        opacity: 1;
      }
    }
  }
`;

const TableFooter = styled.div`
  display: flex;
  align-items: baseline;
  padding: 0.75rem;
  background: white;
  border-bottom: 1px solid #edf1f7;
  border: 1px solid #dee2e6;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  border-top: none;
  font-size: 14px;
  line-height: 21px;

  span {
    color: #3e4857;
    align-self: center;
    padding-left: 0px;
  }

  > nav {
    margin: 0 0 0 auto;
  }

  ul {
    margin-bottom: 0px;
  }
`;

//TODO: use the one in Testform
const CustomSelect = styled.div`
  position: relative;
  select {
    padding-right: 35px;
    /* for Firefox */
    -moz-appearance: none;
    /* for Chrome */
    -webkit-appearance: none;

    /* TODO: add this style direct on the component */
    font-size: 16px;
    color: #8f9bb3;
    background: #ffffff;
    border: 1px solid rgba(194, 204, 217, 0.5);
    box-sizing: border-box;
    border-radius: 4px;
    box-shadow: none;
    margin-left: 16px;
    width: 85px;
  }

  select::-ms-expand {
    display: none;
  }

  i {
    font-size: 10px;
    margin: auto;
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #8f9bb3;

    &.select-icons {
      top: 40%;
    }
  }
`;

Results.propTypes = propTypes;

export default Results;
