import Component from '@glimmer/component';

export default class IssueListComponent extends Component {
  args: {
    issues: [string];
  } = this.args;
}
