import Route from '@ember/routing/route';
import titleSetter from 'client/mixins/title-setter';
import { task, timeout } from 'ember-concurrency';

export default class Login extends Route.extend(titleSetter) {
  title = 'login';

  login = task(function*() {
    console.log('this is called');

    timeout(5000);
    yield true;
  });

  model() {
    return {
      loginTask: this.login
    };
  }
}
