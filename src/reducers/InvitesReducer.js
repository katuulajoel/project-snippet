import * as UserActions from "../actions/InvitesActions";

function invites(state = {}, action) {
  switch (action.type) {
    case UserActions.GET_PENDING_INVITES_SUCCESS:
      return { ...(action.payload || {}) };
    case UserActions.GET_MORE_PENDING_INVITES_SUCCESS:
      return { invites: [...state.invites, ...action.items] };
    default:
      return state;
  }
}

export default invites;
