import React, { Component } from 'react';
import NavBar from '../presentational/nav_bar.js';

class SignUp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <NavBar/>
      <div className="container mt-2">
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter full name"
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
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
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-outline-success">
          Create Account
          </button>
        </form>
      </div>
      </div>

    );
  }
}

export default SignUp;
