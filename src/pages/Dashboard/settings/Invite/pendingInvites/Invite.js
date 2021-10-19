import PropTypes from "prop-types";
import React from "react";
import moment from "moment";

const Invite = ({ invite, resendInvite, deleteInvite }) => {
  return (
    <tr>
      <td>{moment(invite.created_at).format("ll")}</td>
      <td>
        {invite.first_name} {invite.last_name}
      </td>
      <td>{invite.email}</td>
      <td>{invite.display_type}</td>
      <td className="d-flex align-items-center ">
        <button
          className="btn btn-resend"
          aria-label="resend"
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
          aria-label="delete"
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
};

Invite.propTypes = {
  // key: PropTypes.number,
  history: PropTypes.object,
  invite: PropTypes.object,
  resendInvite: PropTypes.func,
  deleteInvite: PropTypes.func,
};

export default Invite;
