/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useState } from "react";
import _ from "lodash";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

/* -------------------------- Internel Dependencies ------------------------- */
import InputGroup from "./InputGroup";
import Icon from "./Icon";
import IconButton from "./IconButton";
import SummaryPlaceholder from "./SummaryPlaceholder/SummaryPlaceholder";
import { listInvoices, listMoreInvoices } from "../actions/InvoiceActions";
import Progress from "./Progress";
import { Link } from "react-router-dom";
import LoadMore from "./LoadMore";

const SearchBox = ({ navHieght }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const { search, isMakingRequest } = useSelector(({ Invoice }) => Invoice);
  const sendQuery = (query) => {
    dispatch(listInvoices({ search: query, page_size: 3 }, true));
  };

  const delayedQuery = _.debounce((q) => sendQuery(q), 500);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    delayedQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <Wrapper navHieght={navHieght?.current?.offsetHeight}>
      <StyledSearchInput
        name="search"
        value={searchTerm}
        autoComplete="off"
        onChange={handleChange}
        className="input-search"
        placeholder="Search...."
        prepend={<Icon name="search1" />}
        isAppendText={false}
        append={<IconButton className="search-close-btn" name="x-circle" />}
        appendFunc={clearSearch}
      />

      {searchTerm && (
        <div className="search-results">
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
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .search-results {
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
  }
`;

const StyledSearchInput = styled(InputGroup)`
  box-shadow: none;
  border: 1px solid rgb(237, 241, 247);
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0 18px;
  align-items: center;
  flex-wrap: nowrap;

  .input-group-prepend .input-group-text {
    background-color: rgb(255, 255, 255);
    color: rgb(62, 72, 87);
    padding: 0px;
    font-size: 16px;
    height: initial;
    border: none;
  }

  > div {
    margin: 0;

    input {
      width: 145px;
      padding: 0 10px;
      border: none;
      &:focus {
        border: none !important;
      }
    }
  }

  .search-close-btn {
    display: flex;
    align-items: center;
    padding: 0;
  }
`;

SearchBox.propTypes = {
  className: PropTypes.string,
  navHieght: PropTypes.any,
  onChange: PropTypes.func,
  selectionKey: PropTypes.string,
  size: PropTypes.string,
};

export default SearchBox;
