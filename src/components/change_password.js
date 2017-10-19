import React, { Component } from 'react';
import ChangePasswordView from '../presentational/change_password_view.js';

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

    fetch(`http://localhost:5000/user?changepassword=true`, {
      method: 'PUT',
      body: JSON.stringify({
        oldPassword: oldPasswordInput,
        newPassword: newPasswordInput
      }),
      credentials: 'include',
      headers: {
        Accept: 'application/json', // this is what i expect to receive from the server
        'Content-Type': 'application/json' // This is what i am sending to the server
      }
    })
      .then(res => res.text())
      .then(data => {
        if (data === 'password') return alert('Incorrect Current Password');
        return this.props.history.push(`/profile`);
      });
  };

  onOldPasswordChange = (event) => {
    this.setState({ oldPasswordInput: event.target.value });
  };
  
  onNewPasswordChange = (event) => {
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
