import axios from "axios";
import {
    GET_USER
} from "./types";

export const saveUser = (newUser) => async (dispatch) => {
  const res = await axios.post(
    process.env.REACT_APP_URL + `/api/user`,
    newUser
  );
  dispatch({ type: GET_USER, payload: res.data });
};

export const getUser = (userId) => async (dispatch) => {
  const res = await axios.get(
    process.env.REACT_APP_URL + `/api/user/${userId}`
  );
  console.log(res);
  dispatch({ type: GET_USER, payload: res.data });
};
