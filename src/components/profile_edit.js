import React, { Component } from 'react';
import ProfileEditView from '../presentational/profile_edit_view.js';
import { callJSON } from '../ajax_utility.js';
import store from '../redux_create_store.js';
import { loadCurrentUser, updateUserProfile } from '../actions/index.js';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInputValue: '',
      emailInputValue: '',
      loading: true,
      updating: false
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
    if (this.state.updating && store.getState().user.meta.updating === false) {
      return this.props.history.push(`/profile`); //redirect back to profile
    }
    return this.setState({
      nameInputValue: store.getState().user.model.name,
      emailInputValue: store.getState().user.model.email,
      loading: store.getState().user.meta.loading,
      updating: store.getState().user.meta.updating
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }


  onUserInfoUpdate = event => {
    event.preventDefault();
    // when input is submitted, add to database
    const newName = this.state.nameInputValue;
    const newEmail = this.state.emailInputValue;
    if (!newName) {
      return alert('Please input a name');
    }
    if (!newEmail) {
      return alert('Please input an email');
    }
    const newUser = {
      name: newName,
      email: newEmail
    };
    return updateUserProfile(store.dispatch, newUser);
  };

  onNameChange = event => {
    return this.setState({ nameInputValue: event.target.value });
  };

  onEmailChange = event => {
    return this.setState({ emailInputValue: event.target.value });
  };

  render() {
    if (this.state.loading === true) {
      return <b>Please wait, loading...</b>;
    } else if (this.state.updating === true) {
      return <b>Please wait, updating...</b>;
    }
    return (
      <ProfileEditView
        onUserInfoUpdate={this.onUserInfoUpdate}
        onNameChange={this.onNameChange}
        onEmailChange={this.onEmailChange}
        nameInputValue={this.state.nameInputValue}
        emailInputValue={this.state.emailInputValue}
      />
    );
  }
}

export default ProfileEdit;
