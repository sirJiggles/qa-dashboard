import Service from '@ember/service';
import Evented from '@ember/object/evented';

export default class EventManager extends Service.extend(Evented) {
  updateTitle(title: string) {
    this.trigger('updateTitle', title);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'event-manager': EventManager;
  }
}
