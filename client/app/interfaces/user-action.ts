import { Action } from 'redux';

export default interface UserAction extends Action {
  payload: {
    user?: {
      username: string;
    };
  };
}
