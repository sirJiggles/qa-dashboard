import Route from '@ember/routing/route';

export default class DashboardRoute extends Route {
  model() {
    console.error('we are on the right route!');

    return ['issue one', 'issue two', 'issue three'];
  }
}
