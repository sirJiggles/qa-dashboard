import Route from '@ember/routing/route';
import titleSetter from 'client/mixins/title-setter';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import ApiService from 'client/services/api';
import AppRoute from 'client/enums/app-route';
import UserCredentials from 'client/interfaces/user-credentials';

export default class RegisterRoute extends Route.extend(titleSetter, {
  register: task(function*(credentials: UserCredentials) {
    try {
      yield this.api.register(credentials);
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
