import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import EventManager from 'client/services/event-manager';
import { action } from '@ember/object';
import IntlService from 'ember-intl/services/intl';

export default class DashboardRoute extends Route {
  @service
  eventManager!: EventManager;

  @service
  intl!: IntlService;

  model() {
    return ['issue one', 'issue two', 'issue three'];
  }

  @action
  didTransition() {
    this.eventManager.updateTitle(this.intl.t('side_bar.dashboard'));
  }
}
