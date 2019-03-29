import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import EventManager from 'client/services/event-manager';
import { set } from '@ember/object';

export default class HeaderComponent extends Component {
  args: {
    toggleSideBar: () => void;
  } = this.args;

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
    console.log('the update title was called!');
    set(this, 'title', title);
  }
}
