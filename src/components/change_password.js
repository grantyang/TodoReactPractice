import React, { Component } from 'react';
import NavBar from './nav_bar.js';
import { Link } from 'react-router-dom';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPasswordInput: '',
      newPasswordInput: '',
    };
  }

  saveNewPassword = () => {    // when input is submitted, add to database
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
    .then(res => res.text()      
  )
  .then( data => {
    if (data === 'password') return alert('Incorrect Current Password')
    return this.props.history.push(`/profile`);    
    })
};

  
  render() {
    return (
      <div>
        <NavBar />
        <div className="container mt-2">
          <div className="justify-content-sm-center row">
            <b>Current Password:</b>
          </div>
          <div className=" justify-content-sm-center row">
            <form className="col-sm-8" onSubmit={this.saveNewPassword}>
              <input
                className="todoItem list-group-item col-sm-12"
                type="password"
                value={(this.state.oldPasswordInput)}
                onChange={(event) => this.setState({oldPasswordInput:event.target.value})} // update state on change
              />
            </form>
          </div>
          <div className="justify-content-sm-center row">
            <b>New Password:</b>
          </div>
          <div className=" justify-content-sm-center row">
            <form className="col-sm-8" onSubmit={this.saveNewPassword}>
              <input
                className="todoItem list-group-item col-sm-12"
                type="password"
                value={this.state.newPasswordInput}
                onChange={(event) => this.setState({newPasswordInput:event.target.value})} // update state on change
              />
            </form>
          </div>
          <div className="row justify-content-sm-center">
            <button
              className="col-sm-2 btn btn-item btn-success"
              onClick={this.saveNewPassword}>
              Save
            </button>
            <Link className="col-sm-2 btn btn-item btn-warning" to={`/profile`}>
              Return to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ChangePassword;