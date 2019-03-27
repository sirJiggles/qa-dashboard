import Component from '@ember/component';

export default class IssueList extends Component.extend({
  // anything which *must* be merged to prototype here
}) {
  // the args
  title!: string;
  issues!: [string];
}
