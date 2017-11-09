import React from 'react';
import NavBar from '../containers/nav_bar.js';

const SignUpView = props => {
  return (
    <div>
      <NavBar />
      <div className="container mt-2">
        <form>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              value={props.nameInput}
              onChange={props.onNameChange}
              className="form-control"
              placeholder="Enter full name"
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              value={props.emailInput}
              onChange={props.onEmailChange}
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
              value={props.passwordInput}
              onChange={props.onPasswordChange}
              className="form-control"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="btn btn-outline-success"
            onClick={() => {
              props.createUser();
            }}>
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpView;
