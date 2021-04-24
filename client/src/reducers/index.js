import { combineReducers } from "redux";
import userReducer from "./userReducers";
import accountReducer from "./accountReducers";
import externalPayeeReducer from "./externalPayeeReducers";
import refundReducer from "./refundReducers";

export default combineReducers({
  users: userReducer,
  accounts: accountReducer,
  externalPayees: externalPayeeReducer,
  refundRequests: refundReducer
});