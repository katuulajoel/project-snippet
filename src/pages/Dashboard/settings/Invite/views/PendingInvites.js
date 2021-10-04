/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

// /* -------------------- Internel Dependencies (Utilites) -------------------- */
import { ContentSection } from "./StyledComp";
// /* ------------------------- Component dependencies ------------------------- */

import Progress from "../../../../../components/Progress";
import moment from "moment";

import { StyledTable } from "../../../../../components/utils/styles";
import Icon from "../../../../../components/Icon";
import SummaryPlaceholder from "../../../../../components/SummaryPlaceholder/SummaryPlaceholder";
import * as userActions from "../../../../../actions/InvitesActions";

const PendingInvite = (props) => {
  const { invites } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    userActions.getPendingInvites("")(dispatch);
  }, []);

  const resendInvite = (data) => {
    userActions.invite(
      { id: data.id, email: data.email, resend: true },
      this.state.selectionKey,
      "patch"
    );
  };

  const fetchMoreData = () => {
    userActions.getMorePendingInvites()(dispatch);
  };

  const deleteInvite = (id) => {
    userActions.deleteInvite(id, "");
  };

  let is_available = Object.keys(invites).length && invites.results.length;
  return (
    <InfiniteScroll
      dataLength={is_available}
      next={fetchMoreData}
      hasMore={false}
      loader={<Progress />}
      scrollableTarget="main-content"
    >
      <Wrapper>
        <div className="pending__header">
          <button
            onClick={() => props.history.push(`/settings/invite?tab=invite`)}
            className={`pending-invite`}
          >
            <Icon name="arrow-left" /> Back
          </button>
          <h2>Pending Invites</h2>
        </div>
        {is_available ? (
          <StyledTable>
            <thead>
              <tr>
                <th>Sent On</th>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th className="w-20">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invites.results.map((invite, i) => {
                return (
                  <tr key={`invite-${i}`}>
                    <td>{moment(invite.created_at).format("ll")}</td>
                    <td>
                      {invite.first_name} {invite.last_name}
                    </td>
                    <td>{invite.email}</td>
                    <td>{invite.display_type}</td>
                    <td className="d-flex align-items-center ">
                      <button
                        className="btn btn-resend"
                        onClick={() => resendInvite(invite)}
                      >
                        Resend
                      </button>
                      <svg
                        width="14"
                        height="18"
                        viewBox="0 0 14 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => deleteInvite(invite.id)}
                      >
                        <path
                          d="M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"
                          fill="#8F9BB3"
                        />
                      </svg>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </StyledTable>
        ) : (
          <SummaryPlaceholder
            className="page-filters-pay-summary"
            description={`No Pending invites have been created yet`}
          />
        )}
      </Wrapper>
    </InfiniteScroll>
  );
};

PendingInvite.propTypes = {
  history: PropTypes.object,
};

const Wrapper = styled(ContentSection)`
  padding-bottom: 5px;
  .pending__header h2 {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    letter-spacing: 0.05em;
    color: #8f9bb3;
    text-transform: uppercase;
  }
  td:nth-child(3) {
    text-transform: lowercase;
  }
  .pending__header {
    text-align: center;
    display: flex;
    margin-bottom: 0.5rem;
    width: 100%;
    justify-content: center;
    position: relative;
    button {
      position: absolute;
      left: 25px;
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

  table {
    border: none;
    border-radius: 1px;
    tbody tr td {
      font-size: 14px;
      svg {
        cursor: pointer;
      }
    }
    thead tr th {
      font-size: 13px;
    }
    .btn-resend {
      background: rgba(6, 46, 100, 0.05);
      border-radius: 4px;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 150%;
      color: #062e64;
      margin-right: 12px;
    }
    .w-20 {
      width: 20%;
    }
  }
`;

export default PendingInvite;
