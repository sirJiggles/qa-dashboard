import Component from '@glimmer/component';
import hbs from 'htmlbars-inline-precompile';
import { connect } from 'ember-redux';
import getUsersByAccountId from '../reducers';
import fetch from 'fetch';

const stateToComputed = (state, attrs) => ({
  users: getUsersByAccountId(state, attrs.accountId)
});

const dispatchToActions = dispatch => ({
  remove: id =>
    fetch(`/api/users/${id}`, { method: 'DELETE' })
      .then(fetched => fetched.json())
      .then(response => dispatch({ type: 'REMOVE_USER', id: id }))
});

class HeaderComponent extends Component {
  layout = hbs`
    <Header user={{user}} />
  `;
  // {{yield users (action "remove")}}
}

export default connect(
  stateToComputed,
  dispatchToActions
)(HeaderComponent);
