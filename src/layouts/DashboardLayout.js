/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";

/* -------------------------- Internel Dependencies ------------------------- */
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import styled, { withTheme } from "styled-components";
import { NavProvider } from "./RightSideNav/NavContext";
import RightSideNav from "./RightSideNav/RightSideNav";

window.isAgreementOpen = false;
const DashboardLayout = ({ children }) => {
  const divRef = useRef();
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    if (divRef.current) {
      setNavHeight(divRef.current.offsetHeight);
    }
  }, [divRef.current]);

  return (
    <NavProvider>
      <NavBar ref={divRef} />
      <SideBar />
      <MainContent navHeight={navHeight}>{children}</MainContent>
      <RightSideNav />
    </NavProvider>
  );
};

const MainContent = withTheme(styled.div`
  padding: 40px;
  margin-left: 220px;
  margin-top: ${(props) => props.navHeight}px;
  height: calc(100vh - ${(props) => props.navHeight * 0.12562814070351758}vh);
  overflow: auto;
  background-color: #f8f8f8;
  ${(props) => props?.theme?.mixins?.scrollbar}
`);

DashboardLayout.propTypes = {
  children: PropTypes.any,
};

export default DashboardLayout;
