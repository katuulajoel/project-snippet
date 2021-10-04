/* eslint-disable prettier/prettier */
/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
// import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FormGroup } from "reactstrap";
import styled from "styled-components";
/* -------------------- Internel Dependencies (Utilites) -------------------- */
// import connect from "connectors/UserConnector";
/* ------------------------- Component dependencies ------------------------- */
import Icon from "../../../../components/Icon";
import randomstring from "../../../../components/utils/stringUtils";
// import InviteUsers from "./views/InviteUsers";
// import CreateUsers from "./views/CreateUsers";
import PendingInvites from "./views/PendingInvites";
import { isAdmin } from "../../../../components/utils/auth";
import * as userActions from "../../../../actions/InvitesActions";

const Invite = (props) => {
  const [pendingSelectionKey] = useState(randomstring.generate());
  // const [selectionKey] = useState(randomstring.generate());
  const [tabName, setTabName] = useState("invite");

  const { invites } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentTab = props.history.location.search.replace("?tab=", "");
    if (props.history.location.search.replace("?tab=", "") !== tabName) {
      handleTabChange(currentTab);
    }
  }, [props.location]);

  useEffect(() => {
    userActions.getPendingInvites(pendingSelectionKey)(dispatch);
  }, []);

  const handleTabChange = (name) => {
    props.history.push(`/settings/invite?tab=${name}`);
    setTabName(name);
  };

  const fetchMoreData = () => {
    userActions.getMorePendingInvites(pendingSelectionKey)(dispatch);
  };

  const deleteInvite = (id) => {
    userActions.deleteInvite(id, pendingSelectionKey);
  };

  return (
    <ContentSection>
      {tabName !== "pending" && (
        <nav className="content__nav">
          <div className="d-flex">
            <button
              onClick={() => handleTabChange("invite")}
              className={`${tabName === "invite" ? "active" : ""}`}
            >
              INVITE USERS
            </button>
            {isAdmin() && (
              <button
                onClick={() => handleTabChange("create")}
                className={`${tabName === "create" ? "active" : ""}`}
              >
                CREATE CLIENT
              </button>
            )}
          </div>
          <button
            onClick={() => props.history.push(`/settings/invites/pending`)}
            className={`${
              tabName === "pending" ? "active" : ""
            } pending-invite`}
          >
            View pending invites <Icon name="arrow-right" />
          </button>
        </nav>
      )}
      <section>
        {tabName === "pending" && (
          <PendingInvites
            back={handleTabChange}
            invites={invites}
            deleteInvite={deleteInvite}
            selectionKey={pendingSelectionKey}
            fetchMoreData={fetchMoreData}
          />
        )}
      </section>
    </ContentSection>
  );
};

// class Invite extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             tabName: "invite"
//         };
//     }

//     componentDidUpdate(prevProps, prevState) {
//         const currentTab = this.props.history.location.search.replace(
//             "?tab=",
//             ""
//         );
//         if (
//             prevProps.history.location.search.replace("?tab=", "") !==
//             currentTab
//         ) {
//             this.handleTabChange(currentTab);
//         }
//     }

//     handleTabChange = name => {
//         this.props.history.push(`/settings/invite?tab=${name}`);
//         this.setState({ tabName: name });
//     };

//     render() {
//         const { tabName } = this.state;
//         let inviteProps = {
//             isRetrieving: this.props.User.isRetrieving,
//             isInviting: this.props.User.isInviting,
//             hasInvited: this.props.User.hasInvited,
//             errors: this.props.User.errors,
//             UserActions: this.props.UserActions,
//             pendingInvites: this.props.User.pendingInvites,
//             isDeleting: this.props.User.isDeleting,
//             next: this.props.User.next,
//             previous: this.props.User.previous,
//             count: this.props.User.count,
//             back: this.handleTabChange
//         };
//         return (
//             <ContentSection>
//                 {tabName !== "pending" && (
//                     <nav className="content__nav">
//                         <div className="d-flex">
//                             <button
//                                 onClick={() => this.handleTabChange("invite")}
//                                 className={`${tabName === "invite" ? "active" : ""
//                                     }`}
//                             >
//                                 INVITE USERS
//                             </button>
//                             {isAdmin() && (
//                                 <button
//                                     onClick={() =>
//                                         this.handleTabChange("create")
//                                     }
//                                     className={`${tabName === "create" ? "active" : ""
//                                         }`}
//                                 >
//                                     CREATE CLIENT
//                                 </button>
//                             )}
//                         </div>
//                         <button
//                             onClick={() => this.handleTabChange("pending")}
//                             className={`${tabName === "pending" ? "active" : ""
//                                 } pending-invite`}
//                         >
//                             View pending invites <Icon name="arrow-right" />
//                         </button>
//                     </nav>
//                 )}
//                 <section>
//                     {tabName === "invite" && <InviteUsers {...inviteProps} />}
//                     {tabName === "create" && <CreateUsers {...inviteProps} />}
//                     {tabName === "pending" && (
//                         <PendingInvites {...inviteProps} />
//                     )}
//                 </section>
//             </ContentSection>
//         );
//     }
// }

const ContentSection = styled.div`
  .content__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .d-flex {
      button {
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 150%;
        /* identical to box height, or 21px */
        background: transparent;
        margin-right: 1rem;
        letter-spacing: 0.05em;

        color: #8f9bb3;
        border: none;
        text-transform: uppercase;
        &.active {
          color: #da3451;
          font-weight: 600;
        }
      }
    }
    .pending-invite {
      font-style: normal;
      background: transparent;
      font-weight: 600;
      font-size: 14px;
      border: none;
      line-height: 150%;
      /* identical to box height, or 21px */

      color: #062e64;
    }
  }
`;

Invite.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
};

export default Invite;
