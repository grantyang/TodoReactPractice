import React, { Component } from 'react';
import NavBar from './nav_bar.js';
import Input from '../components/input.js';
import { Link } from 'react-router-dom';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      nameInputValue: '',
      emailInputValue: '',
      loading: true,
      saving: false
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/user/`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 403) return alert('Please Log In');
        if (res.status === 401) return alert('Invalid Token');
        return res.json();
      })
      .then(returnedUser => {
        if (returnedUser) {
          this.setState({
            currentUser: returnedUser,
            nameInputValue: returnedUser.name,
            emailInputValue: returnedUser.email,
            loading: false
          });
        }
      });
  }

  onUserInfoUpdate = () => {
    // when input is submitted, add to database
    const currentUser = this.state.currentUser;
    const newName = this.state.nameInputValue;
    const newEmail = this.state.emailInputValue;
    //      const newPassword = this.state.passwordInputValue;
    this.setState({
      saving: true
    });
    fetch(`http://localhost:5000/user/${currentUser.userId}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: newName,
        email: newEmail
        //password: newPassword
      }),
      credentials: 'include',
      headers: {
        Accept: 'application/json', // this is what i expect to receive from the server
        'Content-Type': 'application/json' // This is what i am sending to the server
      }
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
    // when input is changed, update state
    this.setState({
      nameInputValue: event.target.value
    });
  };

  onEmailChange = event => {
    //when date is changed, update state
    this.setState({
      emailInputValue: event.target.value
    });
  };

  render() {
    if (this.state.loading === true) {
      return <b>Please wait, loading...</b>;
    } else if (this.state.saving === true) {
      return <b>Please wait, saving...</b>;
    }
    return (
      <div>
        <NavBar />
        <div>
          <div className="justify-content-sm-center row">
            <b>Change name to:</b>
          </div>
          <div className="justify-content-sm-center row">
            <form className="col-sm-8" onSubmit={this.onUserInfoUpdate}>
              <input
                className="todoItem list-group-item col-sm-12"
                type="text"
                value={this.state.nameInputValue}
                onChange={this.onNameChange} // update state on change
              />
            </form>
          </div>
          <div className="justify-content-sm-center row">
            <b>Change email to:</b>
          </div>
          <div className=" justify-content-sm-center row">
            <form className="col-sm-8" onSubmit={this.onUserInfoUpdate}>
              <input
                className="todoItem list-group-item col-sm-12"
                type="email"
                value={this.state.emailInputValue}
                onChange={this.onEmailChange} // update state on change
              />
            </form>
          </div>
          <div className="row justify-content-sm-center">
            <button
              className="col-sm-2 btn btn-item btn-success"
              onClick={this.onUserInfoUpdate}>
              Save
            </button>
            <button className="col-sm-2 btn btn-item btn-danger">Delete</button>
          </div>
          <div className="row justify-content-sm-center">
            <Link className="col-sm-2 btn btn-item btn-primary" to={`/profile`}>
              Return to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
