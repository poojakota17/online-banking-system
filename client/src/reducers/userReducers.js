import { GET_USER} from "../actions/types";

const initialstate = {
  user: {}
};

// eslint-disable-next-line
export default function (state = initialstate, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
      
    default:
      return state;
  }
}