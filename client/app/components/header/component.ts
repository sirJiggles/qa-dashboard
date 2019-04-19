import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import EventManager from 'client/services/event-manager';
import User from 'client/interfaces/user';
import { Router } from '@ember/routing';
import AppRoute from 'client/enums/app-route';
import UserActionName from 'client/enums/user-action-names';
import { task } from 'ember-concurrency';

export default class HeaderComponent extends Component.extend({
  logout: task(function*(this: any) {
    try {
      // yield this.api.logout();

      // invalidate the session in ember simple auth
      yield this.session.invalidate();

      // run the reducer action to sign out
      this.redux.dispatch({
        type: UserActionName.logout
      });

      // go to the login page, as we just logged out
      this.router.transitionTo(AppRoute.login);
    } catch (err) {
      throw err;
    }
  })
}) {
  args: {
    toggleSideBar: () => void;
    user: User;
  } = this.args;

  @service
  eventManager!: EventManager;

  @service
  intl!: any;

  @service
  router!: Router;

  @service
  redux!: any;

  @service
  session!: any;

  @tracked
  title: string = this.intl.t('title');

  constructor(owner: unknown, args: any) {
    // tslint:disable IArguments
    super(owner, args);

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
}
