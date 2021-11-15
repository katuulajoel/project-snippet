/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useState } from "react";
import { debounce } from "lodash";
import styled from "styled-components";
import { useDispatch } from "react-redux";

/* -------------------------- Internel Dependencies ------------------------- */
import InputGroup from "../InputGroup";
import Icon from "../Icon";
import IconButton from "../IconButton";
import { listInvoices } from "../../redux/actions/InvoiceActions";
import Results from "./Results";

const SearchBox = ({ navHieght }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const sendQuery = (query) => {
    dispatch(listInvoices({ search: query, page_size: 3 }, true));
  };

  const delayedQuery = debounce((q) => sendQuery(q), 500);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    delayedQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <StyledSearchInput
        data-testid="input-search"
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

      <Results {...{ searchTerm, clearSearch, navHieght }} />
    </>
  );
};

const StyledSearchInput = styled(InputGroup)`
  box-shadow: none;
  border: 1px solid rgb(237, 241, 247);
  box-sizing: border-box;
  border-radius: 4px;
  margin-left: 15px;
  // padding: 0 18px;
  background: #fff;
  align-items: center;
  flex-wrap: nowrap;

  .input-group-prepend .input-group-text {
    background-color: rgb(255, 255, 255);
    color: rgb(62, 72, 87);
    margin-left: 10px;
    padding: 0 10px;
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
