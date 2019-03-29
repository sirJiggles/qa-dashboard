import Component from '@glimmer/component';

export default class IssueList extends Component {
  args: {
    issues: [string];
  } = this.args;
}
