import React, { Component } from 'react';
import LoginView from '../presentational/login_view.js';
import { loginUser, loadCurrentUser } from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: ''
    };
  }

  componentDidMount() {
    this.props.loadCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.activeSession && nextProps.activeSession === true) {
      return this.props.history.push(`/`);
    }
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

  login = event => {
    event.preventDefault();
    const emailInput = this.state.emailInput;
    const passwordInput = this.state.passwordInput;
    if (!emailInput) return alert('Please input an email.');
    if (!passwordInput) return alert('Please input a password.');
    const loginData = {
      email: emailInput,
      password: passwordInput
    };
    return this.props.loginUser(loginData);
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

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of the component
  return {
    activeSession: state.user.meta.activeSession
  };
}

function mapDispatchToProps(dispatch) {
  //Whatever is returned will show up as props inside of the component
  return bindActionCreators(
    {
      loadCurrentUser: loadCurrentUser,
      loginUser: loginUser
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
