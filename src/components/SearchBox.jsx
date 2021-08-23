/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useState } from "react";
import _ from "lodash";
import styled from "styled-components";

/* -------------------------- Internel Dependencies ------------------------- */
import InputGroup from "./InputGroup";
import Icon from "./Icon";
import IconButton from "./IconButton";
import SummaryPlaceholder from "./SummaryPlaceholder/SummaryPlaceholder";

const SearchBox = ({ navHieght }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const sendQuery = (query) => console.log(`Querying for ${query}`); // TODO

  const delayedQuery = _.debounce((q) => sendQuery(q), 500);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    delayedQuery(event.target.value);
  };

  const clearSearch = (context) => {
    context.props.onChange({
      target: {
        value: "",
      },
    });
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
          <SummaryPlaceholder description="No results found" />
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
