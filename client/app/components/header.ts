import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import EventManager from 'client/services/event-manager';
import { set } from '@ember/object';

export default class Header extends Component {
  @service
  eventManager!: EventManager;

  title = '';

  didReceiveAttrs() {
    this.eventManager.on('updateTitle', this.updateTitle);
  }

  willDestroy() {
    super.willDestroy();
    this.eventManager.off('updateTitle', this.updateTitle);
  }

  updateTitle(title: string) {
    set(this, 'title', title);
  }
}
