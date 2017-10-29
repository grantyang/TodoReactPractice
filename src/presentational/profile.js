import React from 'react';
import NavBar from '../containers/nav_bar.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Profile = ({ name, email, loading }) => {
  if (loading === true) {
    return <b>Please wait, loading...</b>;
  }
  return (
    <div>
      <NavBar />

      <div className="container mt-2">
        <div className="justify-content-md-left row mt-2 ">
          <h6>Name</h6>
        </div>
        <div className="justify-content-md-left row">
          <span className="col-sm-4 list-group-item">{name}</span>
        </div>

        <div className="justify-content-md-left row mt-2">
          <h6>Email</h6>
        </div>
        <div className="justify-content-md-left row">
          <span className="col-sm-4 list-group-item">{email}</span>
        </div>

        <div className="justify-content-md-left row">
          <Link
            className="col-sm-3 btn mt-2 btn-warning"
            to={`/profile/edit`}>
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of this component
  return {
    name: state.user.model.name,
    email: state.user.model.email,
    loading: state.user.meta.loading
  };
}

export default connect(mapStateToProps)(Profile);
