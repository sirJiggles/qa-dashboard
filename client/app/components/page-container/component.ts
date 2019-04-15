import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import IntlService from 'ember-intl/services/intl';

export default class PageContainerComponent extends Component {
  @service
  intl!: IntlService;

  // by default the side bar is open
  sideBarOpen = false;

  pageTitle = this.intl.t('title');
}
