import {
    GET_ACCOUNTS
  } from "../actions/types";
  
  const initialstate = {
    accounts: []
  };
  
  // eslint-disable-next-line
  export default function (state = initialstate, action) {
    switch (action.type) {
      case GET_ACCOUNTS:
        return {
          ...state,
          accounts: action.payload,
        };
      
      default:
        return state;
    }
  }