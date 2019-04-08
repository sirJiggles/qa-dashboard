import Component from '@glimmer/component';
import { computed, action } from '@ember/object';
import { task } from 'ember-concurrency';

export default class LoginForm extends Component {
  args: {
    register: task;
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

  @action
  async submit() {
    try {
      await this.args.register.perform(this.credentials);
    } catch (err) {
      throw err;
    }
  }
}
