import {
    GET_REQUESTS,
    GET_OPEN_REQUESTS,
    GET_CLOSED_REQUESTS
  } from "../actions/types";
  
  const initialstate = {
    refundRequests: [],
    openRefundRequests:[],
    closedRefundRequests:[]
  };
  
  // eslint-disable-next-line
  export default function (state = initialstate, action) {
    switch (action.type) {
      case GET_REQUESTS:
        return {
          ...state,
          refundRequests: action.payload,
        };

    case GET_OPEN_REQUESTS:
        return {
        ...state,
        openRefundRequests: action.payload,
        };

    case GET_CLOSED_REQUESTS:
        return {
        ...state,
            closedRefundRequests: action.payload,
        };
      
      default:
        return state;
    }
  }