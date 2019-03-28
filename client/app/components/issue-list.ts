import EventManager from 'client/services/event-manager';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class IssueList extends Component {
  args: {
    title: string;
    issues: [string];
  } = this.args;

  @service
  eventManager!: EventManager;

  didInsertElement() {
    super.didInsertElement();
    // @TODO use locale in here
    this.eventManager.updateTitle('Dashboard');
  }
}
