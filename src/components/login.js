import React, { Component } from 'react';
import NavBar from '../presentational/nav_bar.js';

class Login extends Component {
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
            <label >Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label >Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-outline-primary">
            Login
          </button>
        </form>
      </div>
      </div>

    );
  }
}

export default Login;
