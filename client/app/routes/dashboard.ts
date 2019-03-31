import Route from '@ember/routing/route';
import titleSetter from 'client/mixins/title-setter';

export default class DashboardRoute extends Route.extend(titleSetter) {
  title = 'dashboard';

  model() {
    return ['issue one', 'issue two', 'issue three'];
  }
}
