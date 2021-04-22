import { combineReducers } from "redux";
import userReducer from "./userReducers";
import accountReducer from "./accountReducers";

export default combineReducers({
  users: userReducer,
  accounts: accountReducer
});