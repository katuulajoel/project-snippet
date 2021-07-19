/* eslint-disable no-undef */
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import styleable from "react-styleable";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";

import { toggleRightNav } from "../../actions/UtilityActions";
// import { createResult } from "../../actions/TestResultsActions";

import Icon from "../core/Icon";
import SearchBox from "../core/SearchBox";
import Button from "../core/Button";
import { proxySafeUrl } from "../utils/proxy";

import { isAdminOrPM } from "../utils/auth";

// import { openModal } from "../core/utils/modals";

// import TestForm from "../../pages/Dashboard/tests/TestForm";

import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

import css from "./NavBar.module.scss";

class NavBar extends React.Component {
  static defaultProps = {
    variant: "dashboard",
    breakpoint: "md",
    isLargeDevice: false,
  };

  static propTypes = {
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    variant: PropTypes.string,
    className: PropTypes.string,
    user: PropTypes.object,
    onSignOut: PropTypes.func,
    breakpoint: PropTypes.string,
    isLargeDevice: PropTypes.bool,
    noTitleBar: PropTypes.bool,
    location: PropTypes.object,
    history: PropTypes.object,
    collapseRightNav: PropTypes.func,
    Project: PropTypes.object,
    match: PropTypes.object,
    saveTestResult: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      dropdownOpen: false,
      isProjectDetail: false,
      projectId: null,
    };
  }

  componentDidMount() {
    this.hideCreateSearch(this.props.location);

    let updateNavbar = function () {
      let windowWidth = $(window).innerWidth();
      if (windowWidth >= 768) {
        if ($(document).scrollTop() >= 20) {
          $(".navbar").addClass("navbar-showcase-fixed");
        } else {
          $(".navbar").removeClass("navbar-showcase-fixed");
        }
      }
    };

    const { variant } = this.props;
    if (variant === "showcase") {
      $(document).ready(updateNavbar);
      $(document).scroll(updateNavbar);
      $(window).resize(updateNavbar);
    }

    this.unlisten = this.props.history.listen((location) => {
      this.hideCreateSearch(location);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  onSignOut(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.props.onSignOut) {
      this.props.onSignOut();
    }
  }

  setCopied = () => {
    this.setState({ copied: true });
  };

  clearCopied = () => {
    let self = this;
    // user timer to prevent flicker
    setTimeout(() => {
      if (self.state.copied) {
        this.setState({ copied: false });
      }
    }, 1000);
  };

  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  hideCreateSearch = (location) => {
    let projectId = location.pathname.split("/")[2];
    if (!isNaN(projectId)) {
      this.setState({ isProjectDetail: true, projectId: projectId });
    } else {
      this.setState({ isProjectDetail: false });
    }
  };

  openRightNav = () => {
    this.props.collapseRightNav(true, "project");
  };

  //   addNewTest = () => {
  //     openModal(
  //       <TestForm id="test-form" />,
  //       `Add New Result`,
  //       true,
  //       {
  //         className: "modal-tests",
  //         ok: `Save`,
  //         cancel: "Close",
  //         form: {
  //           type: "submit",
  //           form: `test-form`,
  //         },
  //         style: { maxWidth: "768px" },
  //       },
  //       null,
  //       false
  //     ).then(
  //       (data) => {
  //         this.props.saveTestResult(data);
  //       },
  //       () => {}
  //     );
  //   };

  render() {
    let {
      title,
      user,
      variant,
      breakpoint,
      className,
      noTitleBar,
      //   Project: { projects },
    } = this.props;

    return (
      <nav
        className={`navbar navbar-expand-${
          breakpoint || "md"
        } fixed-top navbar-dark ${className || ""} ${
          variant ? `navbar-${variant}` : ""
        } ${noTitleBar ? "no-title-bar" : ""}`}
      >
        <Link
          to={`/${variant === "dashboard" ? "dashboard" : ""}`}
          className="navbar-brand"
        >
          {variant === "dashboard" ? (
            title
          ) : (
            <img src={require("../../assets/images/logo_new_color.png")} />
          )}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="tg-ic-bars" />
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ml-auto">
            {user && user.id ? (
              this.state.isProjectDetail ? (
                projects[this.state.projectId] &&
                projects[this.state.projectId].stage !== "opportunity" ? (
                  <li>
                    <Button
                      className={css["right-nav-button"]}
                      onClick={() => {
                        this.openRightNav();
                      }}
                    >
                      <Icon name="dots-horizontal" />
                      &nbsp;&nbsp;&nbsp;More
                    </Button>
                  </li>
                ) : null
              ) : (
                <>
                  {variant !== "showcase" && this.props.match.url !== "/tests" && (
                    <li>
                      <StyledSearchBox
                        variant="search"
                        clear={true}
                        match={this.props.match}
                      />
                    </li>
                  )}
                  {!isAdminOrPM() ? null : this.props.match.url === "/tests" ? (
                    <li>
                      <StyledButton onClick={() => this.addNewTest()}>
                        <Icon name="round-add" />
                        &nbsp;&nbsp;&nbsp;Add New Result
                      </StyledButton>
                    </li>
                  ) : (
                    <li className={css["add-item"]}>
                      <ButtonDropdown
                        className={css["add-btn"]}
                        isOpen={this.state.dropdownOpen}
                        toggle={this.toggle}
                      >
                        <DropdownToggle>
                          <Icon name="round-add" />
                          &nbsp;&nbsp;&nbsp;New
                        </DropdownToggle>
                        <DropdownMenu className={css["dropdown-menu"]}>
                          <DropdownItem className={css["dropdown-item"]}>
                            <Link to="/projects/new/managed/details">
                              <Icon name="briefcase-clock-outline" />
                              Managed Project
                            </Link>
                          </DropdownItem>
                          <DropdownItem className={css["dropdown-item"]}>
                            <Link to="/projects/new/dedicated/details">
                              <Icon name="account-outline" />
                              Dedicated Developer
                            </Link>
                          </DropdownItem>
                          <DropdownItem className={css["dropdown-item"]}>
                            <Link to="/projects/new/opportunity">
                              <Icon name="bullhorn-outline" />
                              Opportunity
                            </Link>
                          </DropdownItem>
                        </DropdownMenu>
                      </ButtonDropdown>
                    </li>
                  )}
                </>
              )
            ) : (
              <>
                <li>
                  <Link to={proxySafeUrl("/signin")} className="btn btn-auth">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

const StyledButton = styled(Button)`
  box-shadow: none;
`;

const StyledSearchBox = styled(SearchBox)`
  border: 1px solid #edf1f7;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 7.5px 18px;

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
    background-color: #fff;
    color: #3e4857;
    padding: 0 !important;
    font-size: 16px;
    height: auto !important;
    &:focus {
      background-color: #fff;
    }
  }
`;

function mapStateToProps(state) {
  return {
    Project: state?.app?.Project,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    collapseRightNav: bindActionCreators(toggleRightNav, dispatch),
    // saveTestResult: bindActionCreators(createResult, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(styleable(css)(NavBar)));
