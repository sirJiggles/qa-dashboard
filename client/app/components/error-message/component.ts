import Component from '@glimmer/component';
import { Task } from 'ember-concurrency';

export default class ErrorMessageComponent extends Component {
  args: {
    task: Task<any, any>;
  } = this.args;
}
