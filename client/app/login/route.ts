import Route from '@ember/routing/route';
import titleSetter from 'client/mixins/title-setter';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import UserCredentials from 'client/interfaces/user-credentials';
import ApiService from 'client/services/api';
import AppRoute from 'client/enums/app-route';
import UserAction from 'client/enums/user-actions';

export default class LoginRoute extends Route.extend(titleSetter, {
  redux: service(),
  session: service(),

  login: task(function*(credentials: UserCredentials) {
    try {
      yield this.session.authenticate('authenticator:jwt', credentials);

      // store the user in redux baby
      this.redux.dispatch({
        type: UserAction.login,
        payload: {
          user: {
            username: credentials.username
          }
        }
      });

      // if we are logged in lets now go to the dashboard
      this.transitionTo(AppRoute.dashboard);
    } catch (err) {
      // catch the server errors here
      throw err.json;
    }
  })
}) {
  title = 'login';

  @service
  api!: ApiService;
}
