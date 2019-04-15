import UserAction from 'client/enums/user-actions';
import { Action } from 'redux';

const initialState = {
  username: undefined
};

// @Todo get the state type defs working here
export default function user(state: any, action: Action) {
  if (action.type === UserAction.register) {
    return {
      ...state,
      username: action.payload.username
    };
  }

  return state || initialState;
}
