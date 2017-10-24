import React, { Component } from 'react';
import ProfileView from '../presentational/profile_view.js';
import { callJSON } from '../ajax_utility.js';
import { loadCurrentUser } from '../actions/index.js';
import store from '../redux_create_store.js';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loading: true
    };
  }

  componentWillMount() {
    loadCurrentUser(store.dispatch);
  }

  componentDidMount() {
    this.updateComponentState(); //keep in sync with redux
    this.unsubscribe = store.subscribe(this.updateComponentState);
  }

  updateComponentState = () => {
    return this.setState({
      name: store.getState().user.model.name,
      email: store.getState().user.model.email,
      loading: store.getState().user.meta.loading
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }


  render() {
    if (this.state.loading === true) {
      return <b>Please wait, loading...</b>;
    }
    return <ProfileView name={this.state.name} email={this.state.email} />;
  }
}

export default Profile;
