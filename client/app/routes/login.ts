import Route from '@ember/routing/route';
import titleSetter from 'client/mixins/title-setter';

export default class Login extends Route.extend(titleSetter) {
  title = 'login';
}
