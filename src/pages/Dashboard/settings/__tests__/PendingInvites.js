import React from "react";
import { Provider } from "react-redux";
import { cleanup, render, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PendingInvites from "../Invite/pendingInvites/PendingInvites";
import Invite from "../Invite/pendingInvites/Invite";
import store from "../../../../redux/store";

afterEach(cleanup);

describe("PendingInvites test", () => {
  it("PendingInvites component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <PendingInvites />
        </Router>
      </Provider>
    );

    expect(asFragment(<PendingInvites />)).toMatchSnapshot();
  });
});

describe("Invites test", () => {
  it("Invites component snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Router>
          <Invite
            invite={{
              id: 1,
              created_by: 2,
              display_name: "Suleiman Mohammed",
              display_type: "Project Owner",
              first_name: "Suleiman",
              last_name: "Mohammed",
              email: "dah@m.com",
              type: 2,
              category: "",
              invitation_sent_at: null,
              resent: false,
              resent_at: null,
              created_at: "2021-10-07T02:03:34.067136",
            }}
          />
        </Router>
      </Provider>
    );

    expect(asFragment(<Invite />)).toMatchSnapshot();
  });

  it("Resend invite", () => {
    let resendInvite = jest.fn();
    const { queryByLabelText } = render(
      <Provider store={store}>
        <Router>
          <Invite
            invite={{
              id: 1,
              created_by: 2,
              display_name: "Suleiman Mohammed",
              display_type: "Project Owner",
              first_name: "Suleiman",
              last_name: "Mohammed",
              email: "dah@m.com",
              type: 2,
              category: "",
              invitation_sent_at: null,
              resent: false,
              resent_at: null,
              created_at: "2021-10-07T02:03:34.067136",
            }}
            resendInvite={resendInvite}
          />
        </Router>
      </Provider>
    );

    const resend = queryByLabelText("resend");

    fireEvent.click(resend);
    expect(resendInvite).toHaveBeenCalledTimes(1);
  });

  it("Delete invite", () => {
    let deleteInvite = jest.fn();
    const { queryByLabelText } = render(
      <Provider store={store}>
        <Router>
          <Invite
            invite={{
              id: 1,
              created_by: 2,
              display_name: "Suleiman Mohammed",
              display_type: "Project Owner",
              first_name: "Suleiman",
              last_name: "Mohammed",
              email: "dah@m.com",
              type: 2,
              category: "",
              invitation_sent_at: null,
              resent: false,
              resent_at: null,
              created_at: "2021-10-07T02:03:34.067136",
            }}
            deleteInvite={deleteInvite}
          />
        </Router>
      </Provider>
    );

    const deleteItem = queryByLabelText("delete");
    fireEvent.click(deleteItem);
    expect(deleteInvite).toHaveBeenCalledTimes(1);
  });
});
