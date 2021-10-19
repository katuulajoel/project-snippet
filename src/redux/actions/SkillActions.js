import axios from "axios";
import { ENDPOINT_SKILLS } from "../../utils/api";
import {
  GET_SKILLS_START,
  GET_SKILLS_SUCCESS,
  GET_SKILLS_FAILED,
  INVALIDATE_SKILLS,
} from "../../configs/constants/ActionTypes";

export const getSkills = (filter) => {
  return (dispatch) => {
    dispatch(getSkillsStart(filter));
    axios
      .get(ENDPOINT_SKILLS, { params: filter })
      .then((response) => {
        dispatch(getSkillsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getSkillsFailed(error.response ? error.response.data : null));
      });
  };
};

export const getSkillsStart = (filter) => {
  return {
    type: GET_SKILLS_START,
    filter,
  };
};

export const getSkillsSuccess = (response) => {
  return {
    type: GET_SKILLS_SUCCESS,
    items: response.results,
    previous: response.previous,
    next: response.next,
    count: response.count,
  };
};

export const getSkillsFailed = (error) => {
  return {
    type: GET_SKILLS_FAILED,
    error,
  };
};

export const invalidateSkills = () => {
  return {
    type: INVALIDATE_SKILLS,
  };
};
