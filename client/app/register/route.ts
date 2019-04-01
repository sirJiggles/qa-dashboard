import Route from '@ember/routing/route';
import titleSetter from 'client/mixins/title-setter';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import ApiService from 'client/services/api';

export default class RegisterRoute extends Route.extend(titleSetter, {
  register: task(function*(credentials: FormData) {
    console.error('got the creds', credentials);

    // const resp = yield this.api.register(credentials);
    // console.error(resp);
  })
}) {
  title = 'register';

  @service
  api!: ApiService;
}
