import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | page-container', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`{{page-container}}`);

    assert.equal('', '');

    // Template block usage:
    await render(hbs`
      {{#page-container}}
        template block text
      {{/page-container}}
    `);

    // assert.equal(, 'template block text');
  });
});
