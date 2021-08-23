/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  match: PropTypes.object,
  sectionLinks: PropTypes.array,
};

const TitleBarContent = ({ match, sectionLinks }) => {
  return (
    <Wrapper>
      {sectionLinks ? (
        <div className="title-filters">
          {sectionLinks.map((link, i) => {
            let url = link[0],
              urlText = link[1],
              badges = link[2] || null;
            return url ? (
              <NavLink
                key={`title-filters-link--${i}`}
                exact={url === "/projects" || url === "/network" ? true : false}
                to={typeof url === "function" ? url(match) : url}
                activeClassName="active"
              >
                {typeof urlText === "function" ? urlText(match) : urlText}
                {badges}
              </NavLink>
            ) : (
              urlText
            );
          })}
        </div>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .title-filters {
    a {
      display: inline-block;
      font-weight: 500;
      text-align: left;
      color: #444;
      padding-bottom: 8px;
      font-size: 16px;
      margin-right: 40px;
      text-decoration: none;

      &.active {
        border-bottom: 3px #da3451 solid;
        color: #da3451;
        font-weight: 600;

        span {
          display: inline-block;
        }
      }

      &:hover,
      &:focus {
        text-decoration: none;
      }
    }
  }
`;

TitleBarContent.propTypes = proptypes;

export default TitleBarContent;
