import axios from "axios";
import {
    GET_USER
} from "./types";

export const saveUser = (newUser) => async (dispatch) => {
  const res = await axios.post(
    "http://localhost:8080/api/user",
    newUser
  );
  dispatch({ type: GET_USER, payload: res.data });
};
