import {
    GET_EXT_PAYEES
  } from "../actions/types";
  
  const initialstate = {
    externalPayees: []
  };
  
  // eslint-disable-next-line
  export default function (state = initialstate, action) {
    switch (action.type) {
      case GET_EXT_PAYEES:
        return {
          ...state,
          externalPayees: action.payload,
        };
      
      default:
        return state;
    }
  }