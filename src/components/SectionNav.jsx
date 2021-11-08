/* -------------------------------------------------------------------------- */
/*                            External dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  links: PropTypes.array.isRequired,
  rightActions: PropTypes.any,
  style: PropTypes.object,
  urlExact: PropTypes.bool,
  title: PropTypes.string,
};

const SectionNav = ({ title, urlExact, links, rightActions, style }) => {
  return (
    <div>
      <Navbar style={style}>
        <div className="filter-links">
          {links.map((link, i) => {
            return (
              <NavLink
                key={`projects-filters--${i}`}
                exact={urlExact}
                to={`/${link.route}`}
                activeClassName="active"
              >
                {link.name}
              </NavLink>
            );
          })}
        </div>

        {title && <h3>{title}</h3>}

        {rightActions}
      </Navbar>
    </div>
  );
};

const Navbar = styled.div`
  margin-bottom: 40px;

  h3 {
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    color: #151a30;
    display: inline-block;
  }

  .filter-links {
    display: inline;
    a {
      position: relative;
      display: inline-block;
      font-weight: 500;
      font-size: 14px;
      line-height: 22px;
      letter-spacing: 0.05em;
      color: #8f9bb3;
      margin-right: 39px;
      text-transform: uppercase;
      text-decoration: none;

      &.active {
        font-weight: 600;
        color: #da3451;
      }
    }
  }
`;

SectionNav.defaultProps = {
  urlExact: true,
  links: [],
};

SectionNav.propTypes = proptypes;

export default SectionNav;
