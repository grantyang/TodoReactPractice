import React, { Component } from 'react';
import ChangePasswordView from '../presentational/change_password_view.js';
import { callJSON } from '../ajax_utility.js';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPasswordInput: '',
      newPasswordInput: ''
    };
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
    callJSON('PUT','user?changepassword=true', {
      oldPassword: oldPasswordInput,
      newPassword: newPasswordInput
    })
      .then(res => res.text())
      .then(data => {
        if (data === 'password') return alert('Incorrect Current Password');
        return this.props.history.push(`/profile`);
      });
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
        saveNewPassword={this.saveNewPassword}
      />
    );
  }
}

export default ChangePassword;
