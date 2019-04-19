import Mixin from '@ember/object/mixin';
import { inject as service } from '@ember/service';

export default Mixin.create({
  eventManager: service() as any,
  intl: service() as any,

  beforeModel() {
    if (!(this as any).title) {
      return;
    }
    this.eventManager.updateTitle(this.intl.t(`pages.${(this as any).title}`));
  }
});
