import {ADD_LOGGED_USER,DELETE_LOGGED_USER} from "../actions/logged_user_actions";

const authUser = {}


export default (state = authUser, action) => {
    switch (action.type){
      case ADD_LOGGED_USER:
      return [
        ...state,
        Object.assign({}, action.contact)
      ];
      default:
            return state;
    }
  };