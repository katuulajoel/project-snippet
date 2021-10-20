/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { withTheme } from "styled-components";
import PropTypes from "prop-types";
import _ from "lodash";
import { useDispatch } from "react-redux";

/* -------------------------- Internal dependencies ------------------------- */
import SectionNav from "../../../components/SectionNav";
import Icon from "../../../components/Icon";
import SearchBox from "../../../components/SearchBox";
import Results from "./results";

import Progress from "../../../components/Progress";
import { fetchResults } from "../../../redux/actions/TestResultsActions";

const propTypes = {
  collapseRightNav: PropTypes.func,
  match: PropTypes.object,
  TestResults: PropTypes.object,
};

const TestsContainer = (props) => {
  const { collapseRightNav, match, TestResults } = props;
  const { data, isMakingRequest } = TestResults;
  const dispatch = useDispatch();

  const [filters] = useState({});
  const [currentPage, setcurrentPage] = useState(0);
  const [lastPageIndex, setlastPageIndex] = useState(0);
  const [useDefaultPageIndex, setuseDefaultPageIndex] = useState(false);
  const [searchTerm, setsearchTerm] = useState("");
  const [limit, setlimit] = useState(20);

  useEffect(() => {
    fetchResults()(dispatch);
  }, [TestResults.isSaving, TestResults.selectedFilters, limit]);

  const onLoadMore = (page) => {
    let updatedFilters = {
      ...filters,
      page_size: limit,
      page: page + 1,
      ...(searchTerm !== "" ? { search: searchTerm } : {}),
    };

    if (page !== currentPage) {
      setcurrentPage(page);
      fetchResults({ ...(updatedFilters || {}) });
    }
  };

  const trackPagination = (index) => {
    setlastPageIndex(useDefaultPageIndex ? 0 : index);
    if (useDefaultPageIndex) {
      setuseDefaultPageIndex(false);
    }
  };

  const delayedQuery = useCallback(
    _.debounce(
      (q) =>
        fetchResults({
          search: q.value,
          page_size: q.limit,
        }),
      1000
    ),
    []
  );

  const handleChange = (value) => {
    setsearchTerm(value);
    delayedQuery({ value: value, limit: limit });
  };

  return (
    <div>
      <SectionNav
        title="Results"
        rightActions={
          <NavActions style={{ float: "right" }}>
            <a href="#" onClick={() => collapseRightNav(true, "filter-tests")}>
              <Icon name="filter-variant" size="sm" /> Filter{" "}
            </a>
            <StyledSearchBox
              variant="search"
              clear={true}
              match={match}
              value={searchTerm}
              delay={0}
              onChange={(e) => handleChange(e)}
            />
          </NavActions>
        }
      />

      {isMakingRequest ? (
        <Progress />
      ) : (
        <Results
          results={data.results}
          onLoadMore={onLoadMore}
          trackPagination={trackPagination}
          lastPageIndex={lastPageIndex}
          count={data.count}
          setlimit={setlimit}
          limit={limit}
        />
      )}
    </div>
  );
};

const StyledSearchBox = styled(SearchBox)`
  border: 1px solid #e5e8ec;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 7.5px 18px;
  margin-left: 42px;

  .input-group-prepend {
    padding-right: 13px;

    .input-group-text {
      background-color: #fff;
      color: #3e4857;
      padding: 0;
      font-size: 16px;
      height: initial;
    }
  }

  .input-group-prepend:last-child {
    padding-left: 8px;
    padding-right: 0px;
    button {
      background-color: #fff;
      padding: 0;
      height: initial;
      i {
        color: #8f9bb3;
        font-size: 16px;
      }
    }
  }

  > input {
    background-color: transparent;
    color: #3e4857;
    padding: 0 !important;
    font-size: 16px;
    height: auto !important;
    &:focus {
      background-color: transparent;
    }
  }
`;

const NavActions = withTheme(styled.div`
  display: flex;

  a {
    align-self: center;
    color: ${(props) => props.theme.colors["gray"] || "initial"};
    font-weight: 500;
    font-size: ${(props) =>
      props.theme.functions.pxToRem(
        14
      )}; /* TODO 14px can be added to global styles cause it seems all text is 14px  */
    text-decoration: none;
    margin-left: 25px;

    /* Pull in mixins from props */
    ${(props) => props.theme.mixins.link(props.theme.colors["gray"])}

    i {
      vertical-align: baseline;
      margin-right: 5px;
    }

    span {
      background: #da3451;
      color: white;
      display: inline-flex;
      min-width: 20px;
      min-height: 20px;
      border-radius: 50%;
      text-align: center;
      justify-content: space-around;
      align-items: center;
    }
  }

  a:nth-child(1) {
    i {
      font-size: 11px; /* TODO: this icon dimensions have to be adjusted in resources directly */
    }
  }
`);

TestsContainer.propTypes = propTypes;

export default TestsContainer;
