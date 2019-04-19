import { connect } from 'ember-redux';

const stateToComputed = (state: { user?: { username: string } }) => ({
  user: state.user
});

// const dispatchToActions = dispatch => ({
//   remove: id =>
//     fetch(`/api/users/${id}`, { method: 'DELETE' })
//       .then(fetched => fetched.json())
//       .then(response => dispatch({ type: 'REMOVE_USER', id: id }))
// });

export default connect(stateToComputed)();
