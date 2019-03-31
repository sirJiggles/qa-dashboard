import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default class LoginForm extends Component {
  args: {
    login: task;
  } = this.args;

  // component state
  username = '';
  password = '';

  // tracked seemed to not work here :/
  @computed('username', 'password')
  get invalid(): boolean {
    return false;
    // return this.username === '' || this.password === '';
  }
}
