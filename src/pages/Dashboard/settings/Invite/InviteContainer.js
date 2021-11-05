/* -------------------------------------------------------------------------- */
/*                            External Dependencies                           */
/* -------------------------------------------------------------------------- */
import React from "react";
import PropTypes from "prop-types";
/* ------------------------- Component dependencies ------------------------- */
import SectionNav from "../../../../components/SectionNav";
import { isAdmin } from "../../../../utils/auth";

const InviteContainer = (props) => {
  return (
    <>
      <SectionNav
        style={{
          marginBottom: "0px",
        }}
        links={[
          ...(isAdmin
            ? [
                { route: `settings/invite`, name: "INVITE USERS" },
                {
                  route: `settings/invite/create`,
                  name: "CREATE CLIENT",
                },
                {
                  route: `settings/invite/pending`,
                  name: "View pending invites",
                },
              ]
            : [
                { route: `settings/invite`, name: "INVITE USERS" },
                {
                  route: `settings/invite/pending`,
                  name: "View pending invites",
                },
              ]),
        ]}
      />
      {props.children}
    </>
  );
};

InviteContainer.propTypes = {
  children: PropTypes.element,
};

export default InviteContainer;
