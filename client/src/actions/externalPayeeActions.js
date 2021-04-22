import axios from "axios";
import {
  GET_EXT_PAYEES
} from "./types";

export const saveExtPayee = (userId, payee) => async (dispatch) => {
    const res = await axios.post(
      process.env.REACT_APP_URL + `/api/external_payee/`+userId,
      payee
    );
    dispatch({ type: GET_EXT_PAYEES, payload: res.data });
  };

  export const getExternalPayees = (userId) => async (dispatch) => {
    const res = await axios.get(process.env.REACT_APP_URL + `/api/external_payee/`+userId+`/accounts`);
    console.log(res);
    dispatch({ type: GET_EXT_PAYEES, payload: res.data });
  };
  
