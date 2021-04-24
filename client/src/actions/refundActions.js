import axios from "axios";
import {
  GET_REQUESTS,
  GET_OPEN_REQUESTS,
  GET_CLOSED_REQUESTS
} from "./types";

export const saveRequest = (userId,request) => async (dispatch) => {
    const res = await axios.post(
      process.env.REACT_APP_URL + `/api/getrefundrequest/${userId}`,
      request
    );
    dispatch({ type: GET_REQUESTS, payload: res.data });
  };

  export const getRequests = (userId) => async (dispatch) => {
    const res = await axios.get(process.env.REACT_APP_URL + "/api/getrefundrequest/customerid" ,
    { params: { id: userId } });
    console.log(res);
    dispatch({ type: GET_REQUESTS, payload: res.data });
  };

  export const getOpenRequests = () => async (dispatch) => {
    const res = await axios.get(process.env.REACT_APP_URL + "/api/getrefundrequest" ,
    { params: { status: "OPEN" } });
    console.log(res);
    dispatch({ type: GET_OPEN_REQUESTS, payload: res.data });
  };

  export const getClosedRequests = () => async (dispatch) => {
    const res = await axios.get(process.env.REACT_APP_URL + "/api/getrefundrequest" ,
    { params: { status: "CLOSE" } });
    console.log(res);
    dispatch({ type: GET_CLOSED_REQUESTS, payload: res.data });
  };