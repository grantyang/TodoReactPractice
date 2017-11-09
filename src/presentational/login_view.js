import React from 'react';
import NavBar from '../containers/nav_bar.js';

const LoginView = props => {
  return (
    <div>
      <NavBar />
      <div className="container mt-2">
        <form>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              value={props.emailInput}
              onChange={props.onEmailChange}
              className="form-control"
              placeholder="Enter email"
            />
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
            className="btn btn-outline-primary"
            onClick={event => {
              props.login(event);
            }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginView;
