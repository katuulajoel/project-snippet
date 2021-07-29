/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";

/* -------------------------- Internel Dependencies ------------------------- */
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";

window.isAgreementOpen = false;
const DashboardLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <SideBar />
      <div
        style={{ marginTop: "100px", marginLeft: "250px" }}
        className="MainContent"
      >
        {children}
      </div>
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.any,
};

export default DashboardLayout;
