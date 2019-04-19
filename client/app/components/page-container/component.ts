import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PageContainerComponent extends Component {
  @service
  intl!: any;

  // by default the side bar is open
  sideBarOpen = false;

  pageTitle = this.intl.t('title');
}
