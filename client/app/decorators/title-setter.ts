import Route from '@ember/routing/route';
import { getOwner } from '@ember/application';

export default function titleSetter(title: string) {
  return function(route: Route) {
    console.log(route);
    const eventManager = getOwner(route).lookup('service:event-manager');
    const intl = getOwner(route).lookup('service:intl');

    route.didTransition = function() {
      // route.didTransition.apply(arguments);
      console.error('we are in here baby');

      eventManager.updateTitle(intl.t(`side_bar.${title}`));
    };

    // @action
    // didTransition() {
    //   // call the did transition from the user of this decorator
    //   constructor.prototype.didTransition.apply(this, arguments);

    //   this.eventManager.updateTitle(this.intl.t(`side_bar.${title}`));
    // }
  };
}
