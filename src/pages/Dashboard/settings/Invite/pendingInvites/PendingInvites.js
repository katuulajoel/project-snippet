/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
// /* -------------------- Internel Dependencies (Utilites) -------------------- */
// /* ------------------------- Component dependencies ------------------------- */
import Progress from "../../../../../components/Progress";
import { ContentSection, StyledTable } from "../../../../../utils/styles";
import SummaryPlaceholder from "../../../../../components/SummaryPlaceholder/SummaryPlaceholder";
import * as inviteActions from "../../../../../redux/actions/InvitesActions";
import InviteContainer from "../InviteContainer";
import Invite from "./Invite";

const PendingInvite = () => {
  const { invites } = useSelector((store) => store);
  const dispatch = useDispatch();

  useEffect(() => {
    inviteActions.getPendingInvites("")(dispatch);
  }, []);

  const resendInvite = (data) => {
    inviteActions.invite({ id: data.id, email: data.email, resend: true })(
      dispatch
    );
  };

  const fetchMoreData = () => {
    inviteActions.getMorePendingInvites()(dispatch);
  };

  const deleteInvite = (id) => {
    inviteActions.deleteInvite(id, "")(dispatch);
  };

  let is_available = Object.keys(invites).length && invites.results.length;

  return (
    <InviteContainer>
      <InfiniteScroll
        dataLength={invites && invites.count ? invites.count : 0}
        next={fetchMoreData}
        hasMore={false}
        loader={<Progress />}
        scrollableTarget="main-content"
      >
        <Wrapper>
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
                    <Invite
                      invite={invite}
                      resendInvite={resendInvite}
                      deleteInvite={deleteInvite}
                      key={i}
                    />
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
    </InviteContainer>
  );
};

PendingInvite.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
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
