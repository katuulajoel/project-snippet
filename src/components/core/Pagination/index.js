/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useState, useEffect } from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import styled from "styled-components";
import PropTypes from "prop-types";

/* -------------------------- Internal dependencies ------------------------- */
import Icon from "../Icon";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  pages: PropTypes.number,
  page: PropTypes.number,
  PageButtonComponent: PropTypes.any,
  onPageChange: PropTypes.func,
  previousText: PropTypes.string,
  nextPage: PropTypes.func,
  previousPage: PropTypes.func,
  canPreviousPage: PropTypes.bool,
  canNextPage: PropTypes.bool,
  loadMore: PropTypes.func,
};

const PaginationWrapper = ({
  pages,
  page,
  onPageChange,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
  loadMore,
}) => {
  const [visiblePages, setVisiblePages] = useState([]);

  const getVisiblePages = (page, total) => {
    if (total < 7) {
      return filterPages([1, 2, 3, 4, 5, 6], total);
    } else {
      if (page % 5 >= 0 && page > 4 && page + 2 < total) {
        return [1, page - 1, page, page + 1, total];
      } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
        return [1, total - 3, total - 2, total - 1, total];
      } else {
        return [1, 2, 3, 4, 5, total];
      }
    }
  };

  useEffect(() => {
    setVisiblePages(getVisiblePages(null, pages));
    changePage(page + 1);
  }, [pages]);

  useEffect(() => {
    const visiblePages = getVisiblePages(page, pages);
    setVisiblePages(filterPages(visiblePages, pages));
    loadMore(page);
  }, [page]);

  const filterPages = (visiblePages, totalPages) => {
    return visiblePages.filter((page) => page <= totalPages);
  };

  const changePage = (selectedPage) => {
    const activePage = page + 1;

    if (selectedPage === activePage) {
      return;
    }
    /* const visiblePages = getVisiblePages(selectedPage, pages);
        setVisiblePages(filterPages(visiblePages, pages)); */
    onPageChange(selectedPage - 1);
  };

  const activePage = page + 1;

  return (
    <Pagination aria-label="Page navigation example">
      <StyledPaginationItem
        onClick={() => {
          previousPage();
        }}
        disabled={canPreviousPage}
      >
        <PaginationLink href="#">
          <Icon name="arrow-left" size="sm" />
        </PaginationLink>
      </StyledPaginationItem>

      <div className="Table__visiblePagesWrapper" style={{ display: "flex" }}>
        {visiblePages.map((page, index, array) => {
          return array[index - 1] + 2 < page ? (
            <>
              <StyledPaginationItem
                key={page}
                active={activePage === page}
                onClick={() => changePage(page)}
              >
                <PaginationLink href="#">...{page}</PaginationLink>
              </StyledPaginationItem>
            </>
          ) : (
            <StyledPaginationItem
              key={page}
              active={activePage === page}
              onClick={() => changePage(page)}
            >
              <PaginationLink href="#">{page}</PaginationLink>
            </StyledPaginationItem>
          );
        })}
      </div>
      <StyledPaginationItem
        onClick={() => {
          nextPage();
        }}
        disabled={canNextPage}
      >
        <PaginationLink href="#">
          <Icon name="arrow-right" size="sm" />
        </PaginationLink>
      </StyledPaginationItem>
    </Pagination>
  );
};

const StyledPaginationItem = styled(PaginationItem)`
  &.active a.page-link {
    background-color: #062e64;
    border-color: #062e64;
  }
`;

PaginationWrapper.propTypes = proptypes;

export default PaginationWrapper;
