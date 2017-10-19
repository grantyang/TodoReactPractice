import React, { Component } from 'react';
import LoginView from '../presentational/login_view.js';
import { callJSON } from '../ajax_utility.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: ''
    };
  }
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

  login = () => {
    const emailInput = this.state.emailInput;
    const passwordInput = this.state.passwordInput;
    if (!emailInput) return alert('Please input an email.');
    if (!passwordInput) return alert('Please input a password.');

    const loginData = {
      email: emailInput,
      password: passwordInput
    };
    callJSON('POST', 'login', loginData)
      .then(res => res.text())
      .then(data => {
        if (data === 'email') return alert('Incorrect Email');
        if (data === 'password') return alert('Incorrect Password');
        return this.props.history.push(`/`);
      });
  };

  render() {
    return (
      <LoginView
        emailInput={this.state.emailInput}
        passwordInput={this.state.passwordInput}
        onPasswordChange={this.onPasswordChange}
        onEmailChange={this.onEmailChange}
        login={this.login}
      />
    );
  }
}

export default Login;
