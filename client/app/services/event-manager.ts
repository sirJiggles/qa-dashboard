import Service from '@ember/service';
import Evented from '@ember/object/evented';

export default class EventManager extends Service.extend(Evented) {
  title = '';
  loggedIn = false;

  updateTitle(title: string) {
    // store the state in here for the 'current title'
    this.title = title;
    this.trigger('updatedTitle', title);
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'event-manager': EventManager;
  }
}
