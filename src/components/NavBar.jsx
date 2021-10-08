/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";

import SearchBox from "./SearchBox";
import NavLinks from "./NavLinks";
import Progress from "./Progress";

function getMainPath(str) {
  const regex = /^\/([^?\\/]+)/;
  return str.match(regex) ? str.match(regex)[1] : "";
}

const NavBar = (props, ref) => {
  const { className } = props;
  let history = useHistory();
  const { isMakingRequest, project } = useSelector(({ Projects }) => Projects);

  const getNavTitle = () => {
    let title = "Dashboard";
    switch (getMainPath(history.location.pathname)) {
      case "projects":
        title = isMakingRequest.fetch ? (
          <Progress />
        ) : (
          project?.title || "Projects"
        );
        break;
      case "payments":
        title = "Payments";
        break;
      case "settings":
        title = "Settings";
        break;
      case "tests":
        title = "Tests";
        break;
      case "community":
        title = "Community Guide";
        break;
      default:
        break;
    }
    return title;
  };

  return (
    <Wrapper ref={ref} className={`navbar ${className || ""}`}>
      <div className="title-bar">
        <Link to={`/dashboard`} className="navbar-brand">
          {getNavTitle()}
        </Link>
        <ul className="navbar-nav ml-auto">
          <li>
            <SearchBox navHieght={ref} variant="search" clear={true} />
          </li>
        </ul>
      </div>

      <NavLinks />
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 80% / 50%);
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1030;
  left: 220px;
  padding: 0 40px;

  .title-bar {
    padding: 16px 0;
    display: flex;
    align-items: center;
    width: 100%;

    .navbar-brand {
      color: #151a30;
      font-weight: bold;
      line-height: 24px;
      padding: 0;

      &.hover {
        color: #000000;
      }
    }
  }

  .navbar-nav {
    margin: 0 0 0 auto;
    > li {
      > a {
        color: #000000;
      }
    }
  }
`;

NavBar.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default forwardRef(NavBar);
