/* eslint-disable react/no-deprecated */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";
// import { Redirect } from "react-router-dom";
import moment from "moment";
import { connect } from "react-redux";

/* -------------------------- Internel Dependencies ------------------------- */
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/SideBar";
// import TitleBar from "./TitleBar";
// import MainContent from "./MainContent";
import { openConfirm } from "../components/core/utils/modals";
// import ProjectOutput from "./ProjectOutput";
// import RightSideNav from "./projects/project/RightSideNav";
// import FilterTests from "./tests/filterTests";

const AGREEMENT_VERSION = 1.2; // TODO this need to go in a global config
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

  // eslint-disable-next-line no-unused-vars
  componentDidMount(prevProps) {
    // $("body").addClass("is-dashboard");

    const { user, AuthActions } = this.props;

    if (
      user &&
      user.id &&
      parseFloat(user.agree_version || 0) < AGREEMENT_VERSION &&
      !window.isAgreementOpen
    ) {
      window.isAgreementOpen = true;
      openConfirm(
        <div>
          <p>Hi {user.first_name},</p>
          <p>
            A change in our User Agreement has taken place as of Monday, 22nd
            January, 2018. Please read it carefully{" "}
            <a
              href="https://work.tunga.io/agreement"
              target="_blank"
              rel="noreferrer"
            >
              here
            </a>
            .
          </p>
        </div>,
        "",
        false,
        { ok: "I agree", cancel: "I don't agree", mustRespond: true }
      ).then(
        () => {
          AuthActions.updateAuthUser({
            agree_version: AGREEMENT_VERSION,
            agreed_at: moment.utc().format(),
          });
        },
        () => {
          AuthActions.updateAuthUser({
            disagree_version: AGREEMENT_VERSION,
            disagreed_at: moment.utc().format(),
          });
        }
      );
    }
  }

  //   checkIfProjectDetails = (location) => {
  //     let projectId = location.pathname.split("/")[2];
  //     if (!isNaN(projectId)) {
  //       this.setState({ zIndexCap: false });
  //     } else {
  //       this.setState({ zIndexCap: true });
  //     }
  //   };

  //   componentWillMount() {
  //     this.unlisten = this.props.history.listen((location) => {
  //       this.checkIfProjectDetails(location);
  //     });
  //   }

  //   componentWillUnmount() {
  //     this.unlisten();
  //   }

  //   getNavTitle() {
  //     let title = "Dashboard";
  //     switch (this.props.match.url) {
  //       case "/projects/:projectId":
  //         title = "Project title";
  //         break;
  //       case "/projects":
  //         if (this.props.match.isExact) {
  //           title = "Projects";
  //         } else {
  //           let projectId = this.props.location.pathname.split("/")[2];
  //           if (!isNaN(projectId)) {
  //             title = <ProjectOutput id={projectId} field="title" />;
  //           } else {
  //             title = "Projects";
  //           }
  //         }
  //         break;
  //       case "/network":
  //         title = "Network";
  //         break;
  //       case "/payments":
  //         title = "Payments";
  //         break;
  //       case "/settings":
  //         title = "Settings";
  //         break;
  //       case "/tests":
  //         title = "Tests";
  //         break;
  //       case "/onboard":
  //         title = "Dashboard";
  //         break;
  //       default:
  //         break;
  //     }

  //     return title;
  //   }

  render() {
    // const {
    //     user,
    //     // logout,
    //     match,
    //     isLargeDevice,
    //     // rightNavStatus: {
    //     //   toggleRightSideNav: { rightNavContent },
    //     // },
    //   } = this.props,
    //   isDashboardRoute = match.url === "/dashboard",
    //   isWorkRoute = match.url === "/work",
    //   isProposalRoute = match.url === "/proposal",
    //   isOnBoarding = match.url === "/onboard",
    //   isTests = match.url === "/tests",
    //   isPayments = match.url === "/payments";

    // let projectId = this.props.location.pathname.split("/")[2];
    // const isProjectDetailsRoute = !isNaN(projectId);

    // return user && user.id && !__MAINTENANCE__ ? (
    return (
      <>
        <NavBar
        //   variant="dashboard"
        //   //   title={this.getNavTitle()}
        //   user={user}
        //   noTitleBar={
        //     isDashboardRoute ||
        //     isWorkRoute ||
        //     isProposalRoute ||
        //     isOnBoarding ||
        //     isTests ||
        //     (isDashboardRoute && isPayments)
        //   }
        //   isLargeDevice={isLargeDevice}
        />
        {/* TODO: we need to way to show this when not large */}
        {/* {isLargeDevice ? <SideBar onSignOut={logout} /> : null} */}
        <SideBar />

        {/* {isDashboardRoute ||
        isWorkRoute ||
        isProposalRoute ||
        isOnBoarding ||
        isTests ? null : (
          <TitleBar user={user} />
        )} */}

        {/* <MainContent
          isLargeDevice={isLargeDevice}
          zIndexCap={this.state.zIndexCap}
          isProjectDetailsRoute={isProjectDetailsRoute}
          noTitleBar={
            isDashboardRoute ||
            isWorkRoute ||
            isProposalRoute ||
            isOnBoarding ||
            isTests
          }
        /> */}
        {/* {rightNavContent === "filter-tests" && (
          <RightSideNav
            navSections={[
              {
                component: <FilterTests />,
                title: "Filters",
              },
            ]}
          />
        )} */}
      </>
    );
    // : (
    //   <Redirect from="*" to={`/${__MAINTENANCE__ ? "maintenance" : ""}`} />
    // );
  }
}

function mapStateToProps(state) {
  return {
    rightNavStatus: state.Utility,
  };
}

export default connect(mapStateToProps)(DashboardLayout);
