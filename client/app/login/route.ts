import Route from '@ember/routing/route';
import titleSetter from 'client/mixins/title-setter';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import UserCredentials from 'client/interfaces/user-credentials';
import ApiService from 'client/services/api';

export default class LoginRoute extends Route.extend(titleSetter, {
  session: service(),

  login: task(function*(credentials: UserCredentials) {
    try {
      const res = yield this.session.authenticate(
        'authenticator:jwt',
        credentials
      );
      console.log(res);
      if (res.json.error) {
        throw res;
      }
      return res;
      // yield this.api.register(credentials);
      // this.transitionTo(AppRoute.dashboard);
    } catch (err) {
      throw err;
    }
  })
}) {
  title = 'login';

  @service
  api!: ApiService;
}
