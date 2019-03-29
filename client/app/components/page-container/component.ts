import Component from '@glimmer/component';

export default class PageContainerComponent extends Component {
  // by default the side bar is open
  sideBarOpen = true;
  // @TODO locale trans
  pageTitle = 'Qa Dashboard';
}
