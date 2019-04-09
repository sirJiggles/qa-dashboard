import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import ApiService from 'client/services/api';

export default class IssueListComponent extends Component {
  args: {
    issues: [string];
  } = this.args;

  @service
  api!: ApiService;

  @action
  async getUser() {
    const user = await this.api.getUser();
    console.error('got the user baby: ', user);
  }
}
