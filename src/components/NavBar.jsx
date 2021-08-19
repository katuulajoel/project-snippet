/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { forwardRef } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import SearchBox from "../components/SearchBox";
import NavLinks from "./NavLinks";

const NavBar = (props, ref) => {
  const { className } = props;
  let history = useHistory();

  const getNavTitle = () => {
    let title = "Dashboard";
    switch (history.pathname) {
      case "/projects":
        if (history.isExact) {
          title = "Projects";
        } else {
          let projectId = location.pathname.split("/")[2];
          if (!isNaN(projectId)) {
            //  title = <ProjectOutput id={projectId} field="title" />;
          } else {
            title = "Projects";
          }
        }
        break;
      case "/network":
        title = "Network";
        break;
      case "/payments":
        title = "Payments";
        break;
      case "/settings":
        title = "Settings";
        break;
      case "/tests":
        title = "Tests";
        break;
      case "/onboard":
        title = "Dashboard";
        break;
      case "/communityguide":
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

/* NavBar.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
}; */

export default forwardRef(NavBar);
