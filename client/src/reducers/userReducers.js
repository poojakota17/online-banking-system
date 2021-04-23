import { GET_USER,GET_USERS} from "../actions/types";

const initialstate = {
  user: {},
  allUsers:[]
};

// eslint-disable-next-line
export default function (state = initialstate, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
      
    default:
      return state;
  }
}