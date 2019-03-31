import Route from '@ember/routing/route';
import titleSetter from 'client/mixins/title-setter';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class Login extends Route.extend(titleSetter, {
  session: service(),

  login: task(function*(credentials: { username: string; password: string }) {
    try {
      const authenticator = 'authenticator:jwt';
      const res = this.session.authenticate(authenticator, credentials);
      yield res;
    } catch (err) {
      throw err;
    }
  })
}) {
  title = 'login';
}
