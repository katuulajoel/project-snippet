import * as actionTypes from "../../configs/constants/ActionTypes";

function common(state = { button: false }, action) {
  switch (action.type) {
    case actionTypes.SET_BUTTON:
      return { button: action.data };
    default:
      return state;
  }
}

export default common;
