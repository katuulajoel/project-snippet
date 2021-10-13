import * as actionTypes from "../../configs/constants/ActionTypes";

function invites(state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_PENDING_INVITES:
      return { ...(action.payload || {}) };
    case actionTypes.SET_MORE_PENDING_INVITES:
      return { ...state, results: [...state.results, ...action.payload] };
    case actionTypes.DELETE_PENDING_INVITE:
      return {
        ...state,
        results: [...state.results.filter((item) => action.id !== item.id)],
      };
    default:
      return state;
  }
}

export default invites;
