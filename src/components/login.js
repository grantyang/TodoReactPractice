import React, { Component } from 'react';
import LoginView from '../presentational/login_view.js';
import { callJSON } from '../ajax_utility.js';
import { loginUser , loadCurrentUser} from '../actions/index.js';
import store from '../redux_create_store.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: '',
      activeSession:false
    };
  }

  componentWillMount() {
    store.dispatch(loadCurrentUser());
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(this.updateComponentState);
  }

  updateComponentState = () => {
    if (
      !this.state.activeSession &&
      store.getState().user.meta.activeSession === true
    ) {
      return this.props.history.push(`/`);
    }
    return this.setState({
      activeSession: store.getState().user.meta.activeSession,
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
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

  login = (event) => {
    event.preventDefault();
    const emailInput = this.state.emailInput;
    const passwordInput = this.state.passwordInput;
    if (!emailInput) return alert('Please input an email.');
    if (!passwordInput) return alert('Please input a password.');
    const loginData = {
      email: emailInput,
      password: passwordInput
    };
    return store.dispatch(loginUser(loginData))
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
