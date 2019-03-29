import Route from '@ember/routing/route';
import titleSetter from 'client/decorators/title-setter';
import { inject as service } from '@ember/service';
import EventManager from 'client/services/event-manager';
import { action } from '@ember/object';
import IntlService from 'ember-intl/services/intl';

@titleSetter('dashboard')
class DashboardRoute extends Route {
  @service
  eventManager!: EventManager;

  @service
  intl!: IntlService;

  model() {
    return ['issue one', 'issue two', 'issue three'];
  }
}

export default DashboardRoute;
