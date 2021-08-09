/* eslint-disable react/prop-types */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";

/* -------------------------- Internel Dependencies ------------------------- */
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import TitleBar from "./TitleBar";
import { withRouter } from "react-router-dom";

window.isAgreementOpen = false;
const DashboardLayout = ({ children, match, location }) => {
  const getNavTitle = () => {
    let title = "Dashboard";
    switch (match.url) {
      case "/projects":
        if (match.isExact) {
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
    <>
      <NavBar title={getNavTitle()} />
      <TitleBar />
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

export default withRouter(DashboardLayout);
