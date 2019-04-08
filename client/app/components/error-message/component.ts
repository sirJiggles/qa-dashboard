import Component from '@glimmer/component';
import { task } from 'ember-concurrency';

export default class ErrorMessageComponent extends Component {
  args: {
    task: task;
  } = this.args;
}
