import EventManager from 'client/services/event-manager';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class IssueList extends Component {
  args: {
    issues: [string];
  } = this.args;

  @service
  eventManager!: EventManager;

  didUpdate() {
    // super.didUpdate();
    console.error('heeeeeey');
  }

  didInsertElement() {
    // super.didInsertElement();
    console.error('did insert element');
    // @TODO use locale in here
    this.eventManager.updateTitle('Dashboard');
  }

  willDestroy() {
    // super.willDestroy();
    console.error('will destroy');
  }
}
