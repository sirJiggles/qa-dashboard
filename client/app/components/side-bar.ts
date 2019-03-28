import Component from '@glimmer/component';

export default class SideBar extends Component {
  args: {
    sideBarOpen: boolean;
  } = this.args;
}
