import React, { Component } from 'react';
import ProfileView from '../presentational/profile_view.js';
import { callJSON } from '../ajax_utility.js';
import { loadCurrentUser } from '../actions/index.js';
import { connect } from 'react-redux';
import store from '../redux_create_store.js';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    store.dispatch(loadCurrentUser());
  }

  render() {
    if (this.props.loading === true) {
      return <b>Please wait, loading...</b>;
    }
    return <ProfileView name={this.props.name} email={this.props.email} />;
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of this component
  return {
     name: state.user.model.name,
     email: state.user.model.email,
     loading: state.user.meta.loading
  };
}

export default connect(mapStateToProps)(ProfileView);

