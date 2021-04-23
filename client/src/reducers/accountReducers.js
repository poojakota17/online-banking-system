import {
    GET_ACCOUNTS,
    GET_ALL_ACCOUNTS
  } from "../actions/types";
  
  const initialstate = {
    accounts: [],
    allAccounts:[]
  };
  
  // eslint-disable-next-line
  export default function (state = initialstate, action) {
    switch (action.type) {
      case GET_ACCOUNTS:
        return {
          ...state,
          accounts: action.payload,
        };
    case GET_ALL_ACCOUNTS:
        return {
            ...state,
            allAccounts: action.payload,
        };
      
      default:
        return state;
    }
  }