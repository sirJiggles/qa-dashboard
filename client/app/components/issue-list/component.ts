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
    await this.api.getUser();
  }
}
