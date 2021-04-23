import axios from "axios";
import {
  GET_ACCOUNTS,
  GET_ALL_ACCOUNTS
} from "./types";

export const getAccounts = (userId) => async (dispatch) => {
  const res = await axios.get(process.env.REACT_APP_URL + `/api/account/`+userId+`/accounts`);
  console.log(res);
  dispatch({ type: GET_ACCOUNTS, payload: res.data });
};

export const getAllAccounts = () => async (dispatch) => {
    const res = await axios.get(process.env.REACT_APP_URL + `/api/account/all`);
    console.log(res);
    dispatch({ type: GET_ALL_ACCOUNTS, payload: res.data });
  };


