import React, { Component } from 'react';
import SignUpView from '../presentational/signup_view.js';
import {callJSON} from '../ajax_utility.js';
import { createNewUser } from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInput: '',
      emailInput: '',
      passwordInput: '',
    };
  }

  onNameChange = event => {
    // when name is changed, update state
    this.setState({
      nameInput: event.target.value
    });
  };

  onEmailChange = date => {
    //when email is changed, update state
    this.setState({
      emailInput: date.target.value
    });
  };  
  
  onPasswordChange = event => {
    //when password is changed, update state
    this.setState({
      passwordInput: event.target.value
    });
  };

  createUser = () => {
    const nameInput = this.state.nameInput;
    const emailInput = this.state.emailInput;
    const passwordInput = this.state.passwordInput;
    if (!nameInput) {
      alert('Please input a name.');
      return;
    }
    if (!emailInput) {
      alert('Please input an email.');
      return;
    }
    if (!passwordInput) {
      alert('Please input a password.');
      return;
    }

    const newUser = {
      name: nameInput,
      email: emailInput,
      password: passwordInput
    };
    this.props.createNewUser(newUser)
    return this.props.history.push(`/login`);
  };

  render() {
    return (
      <SignUpView
      nameInput={this.state.nameInput}
      emailInput={this.state.emailInput}
      passwordInput={this.state.passwordInput}
      onNameChange={this.onNameChange}
      onEmailChange={this.onEmailChange}
      onPasswordChange={this.onPasswordChange}
      createUser={this.createUser}
      />
    );
  }
}

function mapDispatchToProps(dispatch) {
  //Whatever is returned will show up as props inside of the component
  return bindActionCreators(
    {
      createNewUser: createNewUser,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(SignUp);
