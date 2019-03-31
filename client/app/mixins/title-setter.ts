import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  eventManager: service(),
  intl: service(),

  beforeModel() {
    if (!this.title) {
      return;
    }
    this.eventManager.updateTitle(this.intl.t(`pages.${this.title}`));
  }
});
