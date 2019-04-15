import UserAction from 'client/enums/user-actions';
import { Action } from 'redux';

const initialState = {
  details: undefined
};

// @Todo get the state type defs working here
export default function user(state: any, action: Action) {
  if (action.type === UserAction.login) {
    return {
      ...state,
      details: action.payload.user
    };
  }
  if (action.type === UserAction.register) {
    return {
      ...state,
      details: action.payload.user
    };
  }
  if (action.type === UserAction.logout) {
    return {
      ...state,
      details: undefined
    };
  }

  return state || initialState;
}
