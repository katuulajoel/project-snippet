/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const NavBar = ({ className, title }) => {
  return (
    <Wrapper className={`navbar fixed-top navbar-dashboard ${className || ""}`}>
      <Link to={`/dashboard`} className="navbar-brand">
        {title}
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  padding-bottom: 10px;
  padding-top: 10px;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 hsl(0deg 0% 80% / 50%);

  &.fixed-top {
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
  }

  &.navbar-dashboard {
    left: 220px;
    padding: 16px 40px;
    min-height: 73px;

    .navbar-brand {
      color: #151a30;
      font-weight: bold;
      line-height: 24px;

      &.hover {
        color: #000000;
      }
    }

    .navbar-nav {
      > li {
        > a {
          color: #000000;
        }
      }
    }
  }
`;

NavBar.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default withRouter(NavBar);
