import React, { Component } from 'react';
import ProfileEditView from '../presentational/profile_edit_view.js';
import {callJSON} from '../ajax_utility.js';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInputValue: '',
      emailInputValue: '',
      loading: true,
      saving: false
    };
  }
  
  componentDidMount() {
    callJSON('GET', 'user')    
      .then(res => {
        if (res.status === 403) return alert('Please Log In');
        if (res.status === 401) return alert('Invalid Token');
        return res.json();
      })
      .then(returnedUser => {
        if (returnedUser) {
          this.setState({
            nameInputValue: returnedUser.name,
            emailInputValue: returnedUser.email,
            loading: false
          });
        }
      });
  }

  onUserInfoUpdate = event => {
    event.preventDefault();
    // when input is submitted, add to database
    const newName = this.state.nameInputValue;
    const newEmail = this.state.emailInputValue;

    this.setState({
      saving: true
    });
    callJSON('PUT', 'user', {
      name: newName,
      email: newEmail
    })
      .then(res => {
        return res.json();
      })
      .then(() => {
        this.setState({
          saving: false
        });
        this.props.history.push(`/profile`);
      });
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
    } else if (this.state.saving === true) {
      return <b>Please wait, saving...</b>;
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
