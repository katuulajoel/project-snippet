/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import styled, { withTheme, createGlobalStyle } from "styled-components";
import PropTypes from "prop-types";

/* -------------------------- Internal dependencies ------------------------- */
import Icon from "../components/core/Icon";

/* --------------------------- Component proptypes -------------------------- */
const proptypes = {
  user: PropTypes.object,
  theme: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
};

const GlobalStyle = createGlobalStyle`
  body {
    background: #f8f8f8;
  }
`;

const ReportCreateLayout = () => {
  return (
    <Wrapper>
      <GlobalStyle />
      <div className="layout-navbar">
        <Nav>
          <div className="nav-content">
            <span className="layout-close">
              <Icon name="x-circle" />
              Close
            </span>

            <h5>Progress event title {/* TODO: fix this*/}</h5>
          </div>
        </Nav>
      </div>
    </Wrapper>
  );
};

const Wrapper = withTheme(styled.div`
  height: 100vh;
  display: block;
  width: 100%;
  position: fixed;
  margin-top: 73px;
  overflow-y: scroll;
  overflow-x: scroll;

  &:hover::-webkit-scrollbar {
    visibility: visible;
  }

  &::-webkit-scrollbar {
    visibility: hidden;
  }

  ${(props) => props.theme.mixins.scrollbar}

  .layout-navbar {
    display: block;
    background: #fff;
    box-shadow: 0 2px 4px 0 hsla(0, 0%, 80%, 0.5);
    position: fixed;
    width: 100%;
    top: 0;
    right: 0;
  }
`);

const Nav = withTheme(styled.div`
  .nav-content {
    padding: 24px 40px;

    h5 {
      font-weight: bold;
      font-size: ${(props) => props.theme.functions.pxToRem(20)};
      line-height: ${(props) => props.theme.functions.pxToRem(24)};
      text-align: center;
      color: ${(props) => props.theme.colors["text-black"]};
      margin: 0;
    }

    .layout-close {
      float: left;
      a {
        font-weight: 500;
        font-size: ${(props) => props.theme.functions.pxToRem(16)};
        line-height: ${(props) => props.theme.functions.pxToRem(19)};
        color: ${(props) => props.theme.colors["gray"]};
      }
    }

    .layout-close a {
      text-decoration: none;
      i {
        font-size: ${(props) => props.theme.functions.pxToRem(20)};
        vertical-align: text-bottom;
        margin-right: 10px;
      }
    }
  }
`);

ReportCreateLayout.propTypes = proptypes;

export default ReportCreateLayout;
