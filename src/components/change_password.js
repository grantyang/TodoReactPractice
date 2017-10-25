import React, { Component } from 'react';
import ChangePasswordView from '../presentational/change_password_view.js';
import { callJSON } from '../ajax_utility.js';
import store from '../redux_create_store.js';
import { loadCurrentUser, updateUserPassword } from '../actions/index.js';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPasswordInput: '',
      newPasswordInput: '',
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
      updating: store.getState().user.meta.updating
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  saveNewPassword = event => {
    // when input is submitted, add to database
    event.preventDefault();
    const oldPasswordInput = this.state.oldPasswordInput;
    const newPasswordInput = this.state.newPasswordInput;

    if (!oldPasswordInput) {
      alert('Please input your current password.');
      return;
    }
    if (!newPasswordInput) {
      alert('Please input a new password.');
      return;
    }
    const passwordObj = {
      oldPassword: oldPasswordInput,
      newPassword: newPasswordInput
    }
    return updateUserPassword(store.dispatch, passwordObj)
  };

  onOldPasswordChange = event => {
    this.setState({ oldPasswordInput: event.target.value });
  };

  onNewPasswordChange = event => {
    this.setState({ newPasswordInput: event.target.value });
  };

  render() {
    return (
      <ChangePasswordView
        saveNewPassword={this.saveNewPassword}
        oldPasswordInput={this.state.oldPasswordInput}
        newPasswordInput={this.state.newPasswordInput}
        onOldPasswordChange={this.onOldPasswordChange}
        onNewPasswordChange={this.onNewPasswordChange}
      />
    );
  }
}

export default ChangePassword;
