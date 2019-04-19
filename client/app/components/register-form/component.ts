import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { Task } from 'ember-concurrency';

export default class LoginForm extends Component {
  args: {
    register: Task<any, any>;
  } = this.args;

  // component state
  username = '';
  password = '';

  // tracked seemed to not work here :/
  @computed('username', 'password')
  get invalid(): boolean {
    return this.username === '' || this.password === '';
  }

  @computed('username', 'password')
  get credentials(): any {
    return {
      password: this.password,
      username: this.username
    };
  }
}
