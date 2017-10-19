import React from 'react';
import NavBar from '../components/nav_bar.js';
import { Link } from 'react-router-dom';

const ProfileView = ({ name, email }) => {
  return (
    <div>
      <NavBar />
      <div className="container mt-2">
        <div className="justify-content-sm-left row mt-2 ">
          <h6>Name</h6>
        </div>

        <div className="justify-content-sm-left row">
          <span className="col-sm-4 list-group-item">{name}</span>
        </div>
        <div className="justify-content-sm-left row mt-2">
          <h6>Email</h6>
        </div>

        <div className="justify-content-sm-left row">
          <span className="col-sm-4 list-group-item">{email}</span>
        </div>
        <div className="justify-content-sm-left row">
          <Link
            className="col-sm-2 btn btn-item btn-warning"
            to={`/profile/edit`}>
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
