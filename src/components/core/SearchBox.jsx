/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import querystring from "querystring";
import _ from "lodash";
import styled, { withTheme } from "styled-components";

/* -------------------------- Internel Dependencies ------------------------- */
import randomstring from "../utils/generateRandomString";
import CustomInputGroup from "./CustomInputGroup";
import Icon from "./Icon";
import Progress from "./Progress";

import { filterEventProps } from "./utils/events";
import { filterInputProps } from "./utils/forms";

import * as UserActions from "../../actions/UserActions";
// import * as ProjectActions from "../../actions/ProjectActions";
// import * as InvoiceActions from "../../actions/InvoiceActions";
import LoadMore from "./LoadMore";
import SummaryPlaceholder from "./SummaryPlaceholder/SummaryPlaceholder";

class SearchBox extends React.Component {
  static defaultProps = {
    branded: true,
    disableResults: false,
    searchPath: "",
    disableForm: false,
    isLocked: false,
    delay: 250,
  };

  static propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    branded: PropTypes.bool,
    selectionKey: PropTypes.string,
    size: PropTypes.string,
    onChange: PropTypes.func,
    disableResults: PropTypes.bool,
    disableForm: PropTypes.bool,
    searchPath: PropTypes.string,
    isLocked: PropTypes.bool,
    delay: PropTypes.number,
    SearchActions: PropTypes.object,
    User: PropTypes.object,
    Project: PropTypes.object,
    Invoice: PropTypes.object,
    match: PropTypes.object,
    clear: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.selectionKey = props.selectionKey || randomstring.generate();

    const queryParams = querystring.parse(
      (window.location.search || "").replace("?", "")
    );
    let query = queryParams.search || "";
    this.search = _.debounce(this.search, this.props.delay);

    this.state = { search: query };
    if (query) {
      this.search(query);
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.search !== prevState.search) {
      this.search(this.state.search);
    }
  }

  getSearchKey(query) {
    return `${this.selectionKey}-${query}`;
  }

  searchKey() {
    return this.getSearchKey(this.state.search);
  }

  onChangeValue = (e) => {
    this.setState({ search: e.target.value });
  };

  isDashboard = () => {
    return (
      this.props.match.url === "/dashboard" ||
      this.props.match.url === "/projects" ||
      this.props.match.url === "/payments" ||
      this.props.match.url === "/tests" ||
      this.props.match.url === "/network" ||
      this.props.match.url === "/settings"
    );
  };

  isDashboardRoute = () => {
    return this.props.match.url === "/dashboard";
  };

  search(query) {
    const { onChange, disableResults } = this.props;
    if (onChange) {
      onChange(query);
    } else if (query && !disableResults) {
      let searchKey = this.getSearchKey(query);
      const { SearchActions } = this.props;
      SearchActions.listProjects({ search: query, page_size: 3 }, searchKey);
      SearchActions.listInvoices({ search: query, page_size: 3 }, searchKey);
    }
  }

  clearSearch = () => {
    this.setState({ search: "" });
  };

  parseSearchEntity(Source, itemsKey, searchKey) {
    const { SearchActions } = this.props;

    return {
      items: (Source.ids[searchKey] || []).map((id) => {
        return Source[itemsKey][id];
      }),
      onLoadMore: () => {
        SearchActions[`listMore${_.upperFirst(itemsKey)}`](
          Source.next[searchKey],
          searchKey
        );
      },
      isLoading: Source.isFetching[searchKey],
      isLoadingMore: Source.isFetchingMore[searchKey],
      hasMore: !!Source.next[searchKey],
      count: Source.count[searchKey],
    };
  }

  render() {
    const {
      User,
      Project,
      Invoice,
      onChange,
      disableResults,
      disableForm,
      searchPath,
    } = this.props;
    let searchKey = this.searchKey(),
      projects = this.parseSearchEntity(Project, "projects", searchKey),
      invoices = this.parseSearchEntity(Invoice, "invoices", searchKey);

    const searchInput = (
      <StyledSearchInput
        name="search"
        variant={`search${
          this.props.clear ? "-action" : this.props.branded ? "" : "-plain"
        }`}
        className={`${this.props.className || ""} ${
          this.props.size ? `input-search-${this.props.size}` : ""
        }`}
        placeholder={this.props.placeholder}
        value={this.state.search}
        autoComplete="off"
        {...filterInputProps(this.props)}
        {...filterEventProps(this.props)}
        prepend={this.props.isLocked ? <Icon name="lock-alt" /> : null}
        disabled={this.props.isLocked}
        onChange={this.onChangeValue}
        append={<Icon name="x-circle" />}
      />
    );

    const totalResult = projects.count + invoices.count;

    return (
      <SearchWidget
        isDash={this.isDashboard()}
        isDashRoute={this.isDashboardRoute()}
        className="search-widget"
      >
        {disableForm ? (
          searchInput
        ) : (
          <form method="get" action={searchPath || ""}>
            {searchInput}
          </form>
        )}

        {this.state.search && !onChange && !disableResults ? (
          <div
            className={`search-results ${
              this.isDashboard() && "search-results-dash"
            }`}
          >
            {projects.isLoading && invoices.isLoading ? (
              <Progress />
            ) : !totalResult ? (
              <SummaryPlaceholder description="No results found" />
            ) : (
              <>
                <div>
                  {projects.isLoading || invoices.isLoading ? (
                    <Progress />
                  ) : null}
                </div>

                <div className="results">
                  {totalResult ? (
                    <span className="counter" data-testid="counter">
                      Showing <strong>{totalResult}</strong> results for{" "}
                      <strong>"{this.state.search}"</strong>
                    </span>
                  ) : null}

                  {projects.isLoading ? null : projects.items.length ? (
                    <div className="section">
                      <div className="title">Projects</div>
                      {projects.items.map((project) => {
                        return (
                          <Link
                            key={project.id}
                            to={`/projects/${project.id}`}
                            className="result-item"
                            onClick={this.clearSearch}
                          >
                            {project.title}
                          </Link>
                        );
                      })}

                      <LoadMore
                        type="text"
                        hasMore={projects.hasMore}
                        isLoadingMore={projects.isLoadingMore}
                        onLoadMore={projects.onLoadMore}
                        variant="outline-primary"
                      >
                        View More
                      </LoadMore>
                    </div>
                  ) : null}

                  {invoices.isLoading ? null : invoices.items.length ? (
                    <div className="section">
                      <div className="title">Payments</div>
                      {invoices.items
                        .filter((item) => item)
                        .map((invoice) => {
                          return (
                            <Link
                              key={invoice.id}
                              to={`/projects/${invoice.project.id}/pay`}
                              className="result-item"
                              onClick={this.clearSearch}
                            >
                              <b>{invoice.project.title}</b>: {invoice.title}
                            </Link>
                          );
                        })}

                      <LoadMore
                        type="text"
                        hasMore={invoices.hasMore}
                        isLoadingMore={invoices.isLoadingMore}
                        onLoadMore={invoices.onLoadMore}
                        variant="outline-primary"
                      >
                        View More
                      </LoadMore>
                    </div>
                  ) : null}
                </div>
              </>
            )}
          </div>
        ) : null}
      </SearchWidget>
    );
  }
}

const StyledSearchInput = styled(CustomInputGroup)`
  .search-close-btn {
    display: flex;
    align-items: center;
  }
`;

const SearchWidget = withTheme(styled.div`
  ${(props) => (props.isDash ? "position: initial;" : "position: relative;")}

  .search-results-dash {
    width: 408px;
    top: ${(props) => (props.isDashRoute ? "73px" : "113px")};
    height: calc(100vh - ${(props) => (props.isDashRoute ? "73px" : "113px")});
    right: 0;
    overflow-y: scroll;

    ${(props) => props.theme.mixins.scrollbar}
  }

  .search-results {
    padding: 40px;

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
`);

function mapStateToProps(state) {
  return {
    User: state.app.User,
    Project: state.app.Project,
    Invoice: state.app.Invoice,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    SearchActions: {
      ...bindActionCreators(UserActions, dispatch),
      ...bindActionCreators(ProjectActions, dispatch),
      ...bindActionCreators(InvoiceActions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
