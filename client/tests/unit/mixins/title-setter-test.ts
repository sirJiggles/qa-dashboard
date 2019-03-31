import EmberObject from '@ember/object';
import TitleSetterMixin from 'client/mixins/title-setter';
import { module, test } from 'qunit';

module('Unit | Mixin | title-setter', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let TitleSetterObject = EmberObject.extend(TitleSetterMixin);
    let subject = TitleSetterObject.create();
    assert.ok(subject);
  });
});
