import * as actionTypes from "../../configs/constants/ActionTypes";

function button(state = { pending: false }, action) {
  switch (action.type) {
    case actionTypes.SET_BUTTON:
      return { pending: action.data };
    default:
      return state;
  }
}

export default button;
