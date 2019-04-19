import UserAction from 'client/interfaces/user-action';
import UserActionName from 'client/enums/user-action-names';

const initialState = {
  details: undefined
};

// @Todo get the state type defs working here
export default function user(state: any, action: UserAction) {
  if (action.type === UserActionName.login) {
    return {
      ...state,
      details: action.payload.user
    };
  }
  if (action.type === UserActionName.register) {
    return {
      ...state,
      details: action.payload.user
    };
  }
  if (action.type === UserActionName.logout) {
    return {
      ...state,
      details: undefined
    };
  }

  return state || initialState;
}
