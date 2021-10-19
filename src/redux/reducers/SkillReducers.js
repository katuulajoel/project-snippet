import { combineReducers } from "redux";
import {
  GET_SKILLS_START,
  GET_SKILLS_SUCCESS,
  GET_SKILLS_FAILED,
  INVALIDATE_SKILLS,
} from "../../configs/constants/ActionTypes";

const skills = (state = {}, action) => {
  const selection_key = action.selection || "default";
  const new_state = {};
  switch (action.type) {
    case GET_SKILLS_SUCCESS:
      new_state[selection_key] = action.items;
      return { ...state, ...new_state };
    case INVALIDATE_SKILLS:
      new_state[selection_key] = [];
      return { ...state, ...new_state };
    default:
      return state;
  }
};

const isMakingRequest = (state = {}, action) => {
  const selection_key = action.selection || "default";
  const new_state = {};
  switch (action.type) {
    case GET_SKILLS_START:
      new_state[selection_key] = true;
      return { ...state, ...new_state };
    case GET_SKILLS_SUCCESS:
    case GET_SKILLS_FAILED:
      new_state[selection_key] = false;
      return { ...state, ...new_state };
    default:
      return state;
  }
};

const Skill = combineReducers({
  skills,
  isMakingRequest,
});

export default Skill;
