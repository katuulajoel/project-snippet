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

  &.no-title-bar {
    box-shadow: 0 2px 4px 0 hsla(0, 0%, 80%, 0.5);
  }

  .navbar-brand {
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: #ffffff;

    img {
      height: 50px;
    }
  }

  .navbar-nav {
    .input-search {
      @include padding-y(px-to-rem(7.5));
    }

    > li {
      > a {
        color: get-color("white");
        line-height: 50px;
        @include padding-x(px-to-rem(10));

        &:hover,
        &:focus {
          text-decoration: none;
        }

        .caret {
          margin-left: 5px;
        }
      }

      .dropdown-menu {
        min-width: 190px;
        left: auto;
        right: 0;
        margin-top: 0;
        @include padding-y(0);
        box-shadow: 0 2px 4px 0 rgba(204, 204, 204, 0.5);

        &.dropdown-menu-account {
          min-width: 100px;

          > li > a,
          > li > a:hover,
          > li > a:active {
            color: get-color("black");
            @include padding-y(px-to-rem(10));
            @include padding-x(px-to-rem(14));

            &:hover,
            &:focus {
              color: #da3451;
              background-color: get-color("white");
            }
          }
        }

        > li > a,
        > li > a:hover,
        > li > a:active {
          display: block;
          color: #da3451;
          @include padding-y(px-to-rem(5));
          @include padding-x(px-to-rem(10));

          &:hover,
          &:focus {
            text-decoration: none;
            color: get-color("white");
            background-color: #da3451;
          }
        }
      }
    }

    .btn.btn-auth {
      height: px-to-rem(40);
      line-height: px-to-rem(40);
      padding-left: 20px;
      padding-right: 20px;
      color: #da3451;
      background-color: get-color("light-grey");
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
    }

    .btn-call {
      margin-right: 10px;
    }

    .avatar-wrapper {
      background-color: get-color("white");
      line-height: 1;

      .avatar {
        color: get-color("white");
        background-color: #da3451;
      }
    }
  }
`;

NavBar.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
};

export default withRouter(NavBar);
