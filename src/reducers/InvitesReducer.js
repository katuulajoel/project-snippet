import * as actionTypes from "../actions/utils/ActionTypes";

function invites(state = {}, action) {
  switch (action.type) {
    case actionTypes.GET_PENDING_INVITES_SUCCESS:
      return { ...(action.payload || {}) };
    case actionTypes.GET_MORE_PENDING_INVITES_SUCCESS:
      return { invites: [...state.invites, ...action.items] };
    default:
      return state;
  }
}

export default invites;
