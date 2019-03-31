import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import session from 'ember-simple-auth-token';

export default class LoginForm extends Component {
  args: {
    login: task;
  } = this.args;

  session!: // component state
  username = '';
  password = '';

  // tracked seemed to not work here :/
  @computed('username', 'password')
  get invalid(): boolean {
    return false;
    // return this.username === '' || this.password === '';
  }
}
