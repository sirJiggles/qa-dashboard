import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import 'qunit-dom';

module('Integration | Component | issue-list', function(hooks) {
  setupRenderingTest(hooks);

  test('it shows a list of issues and a title', async function(assert) {
    this.set('title', 'some title');
    this.set('issues', ['one', 'two']);

    await render(hbs`{{issue-list title=title issues=issues}}`);

    assert.dom('[data-test-issues-title]').hasText('some title');
  });
});
