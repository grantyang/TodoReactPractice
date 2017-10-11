import React, { Component } from 'react';
import NavBar from './nav_bar.js';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar/>
        <div className="container mt-2">
          <div className="justify-content-sm-left row">
            <span>Name</span>
          </div>
          <div className="justify-content-sm-left row">
            <span>Email address</span>
          </div>
          <div className="row">
            <Link
              className="col-sm-2 btn btn-item btn-warning"
              to={`/profile/edit`}>
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
