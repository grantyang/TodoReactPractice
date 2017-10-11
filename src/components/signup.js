import React, { Component } from 'react';
import NavBar from './nav_bar.js';

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

    // if (this.state.listOfLists.find(item => item.name.toLowerCase() === newName.toLowerCase())) {
    //   //if there is a duplicate
    //   alert('User already exists.');
    //   return;
    // }

    const newUser = {
      name: nameInput,
      email: emailInput,
      password: passwordInput
    };

    fetch('http://localhost:5000/signup', {
      method: 'POST',
      body: JSON.stringify(newUser),
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        return res.json();
      })
      this.props.history.push(`/login`
      );
      // .then(newList => {
      //   this.setState({
      //     listOfLists: [newList, ...this.state.listOfLists] // add new Object to todoList
      //   });
      // });
  };

  render() {
    return (
      <div>
      <NavBar/>
      <div className="container mt-2">
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={this.state.nameInput}      
              onChange={this.onNameChange}        
              className="form-control"
              placeholder="Enter full name"
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              value={this.state.emailInput}
              onChange={this.onEmailChange}
              className="form-control"
              placeholder="Enter email"
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={this.state.passwordInput}
              onChange={this.onPasswordChange}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-outline-success" onClick={() => {this.createUser()}}>
          Create Account
          </button>
        </form>
      </div>
      </div>

    );
  }
}

export default SignUp;
