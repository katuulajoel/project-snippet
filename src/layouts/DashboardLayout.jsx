/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";

/* -------------------------- Internel Dependencies ------------------------- */
/* import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar"; */

window.isAgreementOpen = false;
class DashboardLayout extends React.Component {
  static defaultProps = {
    isLargeDevice: true,
  };

  static propTypes = {
    user: PropTypes.object, // there must be a new way of representing required props
    logout: PropTypes.func,
    match: PropTypes.object,
    isLargeDevice: PropTypes.bool,
    location: PropTypes.object,
    history: PropTypes.object,
    rightNavStatus: PropTypes.object,
    AuthActions: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.state = {
      zIndexCap: true,
    };
  }

  render() {
    return (
      <>
        {/* <NavBar />
        <SideBar /> */}
      </>
    );
  }
}

export default DashboardLayout;
