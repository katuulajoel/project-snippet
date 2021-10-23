/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

/* -------------------------- Internel Dependencies ------------------------- */
import Progress from "../Progress";
import LoadMore from "../LoadMore";
import { listMoreInvoices } from "../../redux/actions/InvoiceActions";
import SummaryPlaceholder from "../SummaryPlaceholder/SummaryPlaceholder";

const Results = ({ searchTerm, clearSearch, navHieght }) => {
  const { search, isMakingRequest } = useSelector(({ Invoice }) => Invoice);
  const dispatch = useDispatch();
  return (
    <>
      {searchTerm && (
        <Wrapper navHieght={navHieght?.current?.offsetHeight}>
          {isMakingRequest.search && <Progress />}
          {search.data.length == 0 ? (
            <SummaryPlaceholder description="No results found" />
          ) : (
            <div className="results">
              {search.data.length && (
                <span className="counter" data-testid="counter">
                  Showing <strong>{search.data.length}</strong> results for{" "}
                  <strong>&quot;{searchTerm}&quot;</strong>
                </span>
              )}

              {isMakingRequest.search ? null : search.data.length ? (
                <div className="section">
                  <div className="title">Payments</div>
                  {search.data.map((invoice) => {
                    return (
                      <Link
                        key={invoice?.id}
                        to={`/projects/${invoice?.project.id}/pay`}
                        className="result-item"
                        onClick={clearSearch}
                      >
                        <b>{invoice?.project.title}</b>: {invoice?.title}
                      </Link>
                    );
                  })}

                  <LoadMore
                    type="text"
                    hasMore={search.next && search.next != ""}
                    isLoadingMore={isMakingRequest.search}
                    onLoadMore={() =>
                      dispatch(listMoreInvoices(search.next, true))
                    }
                    variant="outline-primary"
                  >
                    View More
                  </LoadMore>
                </div>
              ) : null}
            </div>
          )}
        </Wrapper>
      )}
    </>
  );
};

const Wrapper = styled.div`
  width: 413px;
  top: ${(props) => props.navHieght}px;
  height: calc(100vh - ${(props) => props.navHieght + "px"});
  right: 0;
  overflow-y: scroll;

  ${(props) => props?.theme?.mixins?.scrollbar}
  padding: 40px;
  position: absolute;
  background: #fff;
  border: 1px solid #efefef;
  margin-top: 7.0625rem;

  .results {
    font-size: 16px;
    line-height: 19px;
    color: #151a30;

    .counter {
      b {
        font-weight: 600;
      }
    }
    .section {
      padding: 40px 0;
      border-bottom: 1px solid #edf1f7;

      &:last-of-type {
        border-bottom: none;
      }

      .title {
        font-weight: 600;
        margin-bottom: 16px;
      }
      a {
        display: block;
        text-decoration: none;
        font-weight: 500;
        margin-bottom: 16px;
        color: #151a30;
        b {
          font-weight: 600;
        }
      }

      .text-link {
        button {
          border: none;
          padding: 0;
          font-weight: 600;
          font-size: 14px;
          line-height: 17px;
          color: #da3451;
        }
        button:hover,
        button:focus {
          background-color: #fff;
          color: #da3451;
        }
      }

      .avatar.avatar-dash {
        width: 48px;
        height: 48px;

        &.avatar-initials {
          font-size: 16px;
        }
      }
    }
  }
`;

Results.propTypes = {
  searchTerm: PropTypes.string,
  clearSearch: PropTypes.func,
  navHieght: PropTypes.any,
};

export default Results;
