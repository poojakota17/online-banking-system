import axios from "axios";
import {
  GET_REQUESTS
} from "./types";

export const saveRequest = (request) => async (dispatch) => {
    const res = await axios.post(
      process.env.REACT_APP_URL + `/api/getrefundrequest`,
      request
    );
    dispatch({ type: GET_REQUESTS, payload: res.data });
  };


