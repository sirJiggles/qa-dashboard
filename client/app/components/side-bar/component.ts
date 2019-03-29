import Component from '@glimmer/component';

export default class SideBarComponent extends Component {
  args: {
    sideBarOpen: boolean;
  } = this.args;
}
