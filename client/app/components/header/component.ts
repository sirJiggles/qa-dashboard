import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import EventManager from 'client/services/event-manager';
import { set } from '@ember/object';
import IntlService from 'ember-intl/services/intl';

export default class HeaderComponent extends Component {
  args: {
    toggleSideBar: () => void;
  } = this.args;

  @service
  eventManager!: EventManager;

  @service
  intl!: IntlService;

  title: string;

  constructor() {
    super(...arguments);
    this.title = this.intl.t('title');
  }

  didInsertElement() {
    this.eventManager.on('updatedTitle', this.updateTitle);
  }

  willDestroy() {
    this.eventManager.off('updatedTitle', this.updateTitle);
  }

  updateTitle(title: string) {
    console.log('the update title was called!');
    set(this, 'title', title);
  }
}
