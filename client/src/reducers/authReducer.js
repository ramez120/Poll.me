import { getLoginStatus, LoginUserIn } from "../actions/types";
const authReducer = (state = null, action) => {
  switch (action.type) {
    case getLoginStatus:
      return action.payload || false;
      case LoginUserIn:
        return state;

    default:
      return state;
  }
};
export default authReducer;
