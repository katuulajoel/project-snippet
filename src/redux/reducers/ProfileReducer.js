import * as actionTypes from "../../configs/constants/ActionTypes";

function profile(state = {}, action) {
  switch (action.type) {
    case actionTypes.SET_USER_PROFILE:
      return { ...state, ...action.data };
    case actionTypes.SET_USER_SETTINGS:
      return { ...state, settings: { ...action.data } };
    default:
      return state;
  }
}

export default profile;
