import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import EventManager from 'client/services/event-manager';
import IntlService from 'ember-intl/services/intl';
import { task, timeout } from 'ember-concurrency';
import { action } from '@ember/object';
import User from 'client/interfaces/user';

export default class HeaderComponent extends Component {
  args: {
    toggleSideBar: () => void;
    user: User;
  } = this.args;

  @service
  eventManager!: EventManager;

  @service
  intl!: IntlService;

  @tracked
  title: string = this.intl.t('title');

  constructor() {
    super(...arguments);

    // on init we also want to check the value of the title
    // for the first page we load
    this.updateTitle(this.eventManager.title);

    // subscribe to all calls from here on out
    this.eventManager.on('updatedTitle', this.updateTitle.bind(this));
  }

  willDestroy() {
    this.eventManager.off('updatedTitle', this.updateTitle.bind(this));
  }

  updateTitle(title: string) {
    this.title = title;
  }

  @action
  async logout() {
    // make the call to the API*
    await timeout(500);
    this.eventManager.didLogout();
  }
}
