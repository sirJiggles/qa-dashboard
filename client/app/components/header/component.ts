import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import EventManager from 'client/services/event-manager';
import IntlService from 'ember-intl/services/intl';
import { task, timeout } from 'ember-concurrency';
import { action } from '@ember/object';

export default class HeaderComponent extends Component {
  args: {
    toggleSideBar: () => void;
  } = this.args;

  @service
  eventManager!: EventManager;

  @service
  intl!: IntlService;

  @tracked
  title: string = this.intl.t('title');

  @tracked
  loggedOut = false;

  constructor() {
    super(...arguments);

    // on init we also want to check the value of the title
    // for the first page we load
    this.updateTitle(this.eventManager.title);

    // subscribe to all calls from here on out
    this.eventManager.on('updatedTitle', this.updateTitle.bind(this));
    this.eventManager.on('didLogin', this.didLogin.bind(this));
    this.eventManager.on('didLogout', this.didLogout.bind(this));
  }

  willDestroy() {
    this.eventManager.off('updatedTitle', this.updateTitle.bind(this));
    this.eventManager.off('didLogin', this.didLogin.bind(this));
    this.eventManager.off('didLogout', this.didLogout.bind(this));
  }

  updateTitle(title: string) {
    this.title = title;
  }

  didLogin() {
    this.loggedOut = false;
  }
  didLogout() {
    this.loggedOut = true;
  }

  @action
  async logout() {
    // make the call to the API*
    await timeout(500);
    this.eventManager.didLogout();
  }
}
