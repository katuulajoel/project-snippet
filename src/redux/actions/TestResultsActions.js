import axios from "axios";
import { ENDPOINT_TEST_RESULTS } from "../../utils/api";
import {
  FETCH_RESULT_START,
  FETCH_RESULT_SUCCESS,
  FETCH_RESULT_FAILED,
} from "../../configs/constants/ActionTypes";
import { failed, start, success } from "../../utils/actions";

export const fetchResults = (filter) => {
  return (dispatch) => {
    dispatch(start(FETCH_RESULT_START));
    axios
      .get(ENDPOINT_TEST_RESULTS, { params: filter })
      .then((response) => {
        dispatch(success(FETCH_RESULT_SUCCESS, response.data));
      })
      .catch((error) => {
        dispatch(
          failed(
            FETCH_RESULT_FAILED,
            error.response
              ? error.response.data
              : { message: "Could not fetch results" }
          )
        );
      });
  };
};
