import React, { Component } from 'react';
import NavBar from './nav_bar.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailInput: '',
      passwordInput: '',
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
    if (!emailInput) {
      alert('Please input an email.');
      return;
    }
    if (!passwordInput) {
      alert('Please input a password.');
      return;
    }
    //if email is wrong or if password is wrong
    const loginData = {
      email: emailInput,
      password: passwordInput
    };
    fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.text()      
    )
    .then( data => {
      if (data === 'email') return alert('Incorrect Email')      
      if (data === 'password') return alert('Incorrect Password')
      return this.props.history.push(`/`)
      })
  };


  render() {
    return (
      <div>
      <NavBar/>
      <div className="container mt-2">
        <form>
          <div className="form-group">
            <label >Email address</label>
            <input
              type="email"
              value={this.state.emailInput}
              onChange={this.onEmailChange}
              className="form-control"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label >Password</label>
            <input
              type="password"
              value={this.state.passwordInput}
              onChange={this.onPasswordChange}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-outline-primary" onClick={() => {this.login()}}>
            Login
          </button>
        </form>
      </div>
      </div>

    );
  }
}

export default Login;
