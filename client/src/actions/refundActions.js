import axios from "axios";
import {
  GET_REQUESTS,
  GET_OPEN_REQUESTS,
  GET_CLOSED_REQUESTS
} from "./types";

export const saveRequest = (userId,request) => async (dispatch) => {
    const res = await axios.post(
      process.env.REACT_APP_URL + `/api/refundrequest/${userId}`,
      request
    );
    dispatch({ type: GET_REQUESTS, payload: res.data });
  };

  export const getRequests = (userId) => async (dispatch) => {
    const res = await axios.get(process.env.REACT_APP_URL + "/api/refundrequest/customerid" ,
    { params: { id: userId } });
    console.log(res);
    dispatch({ type: GET_REQUESTS, payload: res.data });
  };

  export const getOpenRequests = () => async (dispatch) => {
    const res = await axios.get(process.env.REACT_APP_URL + "/api/refundrequest" ,
    { params: { status: "OPEN" } });
    console.log(res);
    dispatch({ type: GET_OPEN_REQUESTS, payload: res.data });
  };

  export const getClosedRequests = () => async (dispatch) => {
    const res = await axios.get(process.env.REACT_APP_URL + "/api/refundrequest" ,
    { params: { status: "CLOSE" } });
    console.log(res);
    dispatch({ type: GET_CLOSED_REQUESTS, payload: res.data });
  };

  export const closeRequest = (refundRequest, accountNumber) => async (dispatch) => {
    const res = await axios.post(
      process.env.REACT_APP_URL + `/api/refundrequest/toandfromrefundprocess`, refundRequest,
      { params: { accountNo: accountNumber} }
    );
    dispatch({ type: GET_REQUESTS, payload: res.data });
  };