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
    <Wrapper
      className={`navbar navbar-expand-md fixed-top navbar-dark ${
        className || ""
      }`}
    >
      <Link to={`/dashboard`} className="navbar-brand">
        {title}
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
      <div className="collapse navbar-collapse" id="navbar"></div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  .navbar-brand {
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: get-color("white");

    img {
      height: 50px;
    }
  }
`;

NavBar.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default withRouter(NavBar);
