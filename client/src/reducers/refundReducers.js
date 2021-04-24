import {
    GET_REQUESTS
  } from "../actions/types";
  
  const initialstate = {
    refundRequests: []
  };
  
  // eslint-disable-next-line
  export default function (state = initialstate, action) {
    switch (action.type) {
      case GET_REQUESTS:
        return {
          ...state,
          refundRequests: action.payload,
        };
      
      default:
        return state;
    }
  }