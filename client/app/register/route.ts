import Route from '@ember/routing/route';
import titleSetter from 'client/mixins/title-setter';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import ApiService from 'client/services/api';
import AppRoute from 'client/enums/app-route';
import UserCredentials from 'client/interfaces/user-credentials';
import UserAction from 'client/enums/user-actions';
import User from 'client/interfaces/user';

export default class RegisterRoute extends Route.extend(titleSetter, {
  // @TODO try to get this ban boi hooked up as a regular service later
  redux: service(),

  register: task(function*(credentials: UserCredentials) {
    try {
      const user = yield this.api.register(credentials) as User;

      // dispatch an action
      this.redux.dispatch({
        type: UserAction.register,
        payload: user
      });

      this.transitionTo(AppRoute.dashboard);
    } catch (err) {
      throw err;
    }
  })
}) {
  title = 'register';

  @service
  api!: ApiService;
}
