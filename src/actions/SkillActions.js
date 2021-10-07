import axios from "axios";
import { ENDPOINT_SKILLS } from "./utils/api";
import { GET_SKILLS_START, GET_SKILLS_SUCCESS, GET_SKILLS_FAILED, INVALIDATE_SKILLS } from "./utils/ActionTypes";

export const getSkills = (filter, selection, prev_selection) => {
  return (dispatch) => {
    dispatch(getSkillsStart(filter, selection, prev_selection));
    axios
      .get(ENDPOINT_SKILLS, { params: filter })
      .then((response) => {
        dispatch(getSkillsSuccess(response.data, selection, prev_selection));
      })
      .catch((error) => {
        dispatch(getSkillsFailed(error.response ? error.response.data : null, selection, prev_selection));
      });
  };
};

export const getSkillsStart = (filter, selection, prev_selection) => {
  return {
    type: GET_SKILLS_START,
    filter,
    selection,
    prev_selection,
  };
};

export const getSkillsSuccess = (response, selection, prev_selection) => {
  return {
    type: GET_SKILLS_SUCCESS,
    items: response.results,
    previous: response.previous,
    next: response.next,
    count: response.count,
    selection,
    prev_selection,
  };
};

export const getSkillsFailed = (error, selection, prev_selection) => {
  return {
    type: GET_SKILLS_FAILED,
    error,
    selection,
    prev_selection,
  };
};

export const invalidateSkills = () => {
  return {
    type: INVALIDATE_SKILLS,
  };
};
