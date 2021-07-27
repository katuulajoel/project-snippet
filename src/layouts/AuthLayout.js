/* -------------------------------------------------------------------------- */
/*                            External Dependecies                            */
/* -------------------------------------------------------------------------- */
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* ---------------------------- Image Dependency ---------------------------- */
import Logo from "../assets/images/logo_round.png";
import BodyImage from "../assets/images/Body.png";

/* -------------------------- AuthLayout PropTypes -------------------------- */
const propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

/* ------------------------- AuthLayout defaultProps ------------------------ */
const defaultProps = {
  children: <></>,
};

const AuthLayout = ({ children }) => {
  return (
    <>
      <Wrapper>
        <div className="grid_layout d-block d-md-grid">
          <div className="grid-1 d-flex">
            <div className="child__item container" data-testid="auth-layout">
              <Link to="/login">
                <img src={Logo} className="mb-4 logo" />
              </Link>
              {children}
            </div>
          </div>
          <div
            className="grid-2 d-none d-md-block"
            style={{
              backgroundImage: "url(" + BodyImage + ")",
              backgroundSize: "cover",
            }}
          ></div>
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  .d-md-grid {
    @media (min-width: 768px) {
      display: grid !important;
    }
  }
  .grid_layout {
    display: grid;
    min-height: 100vh;
    grid-template-columns: 1fr 1.4fr;
    grid-template-rows: 100%;
    grid-column-gap: 0px;
    background: #fafafa;
    .grid {
      &-1 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;

        @media (max-height: 770px) {
          height: 100vh;
          overflow-y: auto;
          padding: 5rem 0 3rem;
          display: block !important;
          margin: auto;
        }

        @media (max-width: 768px) {
          height: 100vh !important;
        }
        .child__item {
          width: 400px;
          @media (max-width: 980px) {
            width: 100%;
          }
        }
        .logo {
          width: 80px;
        }
      }
      &-2 {
        img.wrapper {
          width: 100%;
          height: 100vh;
          object-fit: cover;
        }
      }
    }
  }
`;

export const AuthStylingLayoutChildren = styled.div`
  .AuthForm__title {
    margin-bottom: 40px;
  }

  .Auth_label {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-bottom: 8px;

    span {
      color: #da3451;
      padding-left: "2px";
    }
  }

  h3 {
    font-style: normal;
    font-weight: 600;
    font-size: 23px;
    line-height: 150%;
    margin-bottom: 4px;
    margin-top: 2px;
    color: #151a30;
  }
  .intro__text {
    font-size: 15px;
    margin-bottom: 3rem;
    line-height: 150%;
    color: #3e4857;
  }
  .intro__link-ext {
    display: flex;
    justify-content: flex-end;
    margin-bottom: -23px;
    font-size: 14px;
    line-height: 150%;
    text-align: right;
    font-weight: 600;
    color: #4868f8;
  }
  .intro__link-link-out {
    font-size: 14px;
    margin-top: 1rem;
    text-align: center;
    font-weight: 300;
  }
  input,
  form-control {
    background: #ffffff;
    border: 1px solid rgba(194, 204, 217, 0.25);
    box-sizing: border-box;
    border-radius: 4px;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 150%;
    color: #8f9bb3;
    padding: 21px 20px;
    box-shadow: none !important;
    &::placeholder {
      color: #8f9bb3 !important;
    }
    &:disabled {
      background: rgba(194, 204, 217, 0.25) !important;
    }
  }
  label {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    margin-top: 0.3rem;
    color: #151a30;
  }
  button {
    margin-top: 2.2rem;
  }
  .text-center {
    button {
      background: #da3451 !important;
      border-radius: 6px;
      box-shadow: none !important;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 150%;

      width: 100%;
      display: block;
      text-align: center;

      color: #ffffff;
    }
  }
`;

AuthLayout.defaultProps = defaultProps;

AuthLayout.propTypes = propTypes;

export default AuthLayout;
