import Component from '@glimmer/component';
import { computed, action } from '@ember/object';
import { task } from 'ember-concurrency';
import IntlService from 'ember-intl/services/intl';
import { inject as service } from '@ember/service';

export default class LoginForm extends Component {
  args: {
    register: task;
  } = this.args;

  // component state
  username = '';
  password = '';
  error = false;

  @service
  intl!: IntlService;

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
    const response = await this.args.register.perform(this.credentials);
    if (response.error) {
      this.error = this.intl.t(response.error);
    } else {
      // was ok
      this.error = false;
    }
  }
}
