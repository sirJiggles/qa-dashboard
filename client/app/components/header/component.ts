import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import EventManager from 'client/services/event-manager';
import IntlService from 'ember-intl/services/intl';

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

  constructor() {
    super(...arguments);
    this.eventManager.on('updatedTitle', this.updateTitle.bind(this));
  }

  willDestroy() {
    this.eventManager.off('updatedTitle', this.updateTitle.bind(this));
  }

  updateTitle(title: string) {
    this.title = title;
  }
}
