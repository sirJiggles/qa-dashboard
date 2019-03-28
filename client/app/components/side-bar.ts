import Component from '@ember/component';
import { tagName } from '@ember-decorators/component';

@tagName('')
export default class SideBar extends Component.extend({
  // anything which *must* be merged to prototype here
}) {
  args: {
    sideBarOpen: boolean;
  } = this.args;
}
