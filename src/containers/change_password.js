import React, { Component } from 'react';
import ChangePasswordView from '../presentational/change_password_view.js';
import { loadCurrentUser, updateUserPassword } from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPasswordInput: '',
      newPasswordInput: ''
    };
  }

  componentDidMount() {
    this.props.loadCurrentUser();
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.updating && nextProps.updating === false) {
      return this.props.history.push(`/profile`); //redirect back to profile
    }
  };

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
    };
    return this.props.updateUserPassword(passwordObj);
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

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of the component
  return {
    updating: state.user.meta.updating
  };
}

function mapDispatchToProps(dispatch) {
  //Whatever is returned will show up as props inside of the component
  return bindActionCreators(
    {
      loadCurrentUser: loadCurrentUser,
      updateUserPassword: updateUserPassword
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
