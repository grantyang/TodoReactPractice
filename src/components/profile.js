import React, { Component } from 'react';
import NavBar from '../presentational/nav_bar.js';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <NavBar/>
      <div className="container mt-2">
      <label>Name</label>
      <label>Email address</label>
      </div>
      </div>
    );
  }
}

export default Profile;
