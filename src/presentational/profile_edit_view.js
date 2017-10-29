import React from 'react';
import NavBar from '../containers/nav_bar.js';
import { Link } from 'react-router-dom';

const ProfileEditView = props => {
  if (props.loading === true) {
    return <b>Please wait, loading...</b>;
  } else if (props.updating === true) {
    return <b>Please wait, updating...</b>;
  }
  return (
    <div>
      <NavBar />
      <div className="container mt-2">
        <div className="justify-content-center row">
          <b>Change name to:</b>
        </div>
        <div className="justify-content-center row">
          <form
            className="col-sm-8"
            onSubmit={event => props.onUserInfoUpdate(event)}>
            <input
              className="todoItem list-group-item col-sm-12"
              type="text"
              value={props.nameInputValue}
              onChange={event => props.onNameChange(event)} // update state on change
            />
          </form>
        </div>

        <div className="justify-content-center row">
          <b>Change email to:</b>
        </div>
        <div className=" justify-content-center row">
          <form
            className="col-sm-8"
            onSubmit={event => props.onUserInfoUpdate(event)}>
            <input
              className="todoItem list-group-item col-sm-12"
              type="email"
              value={props.emailInputValue}
              onChange={event => props.onEmailChange(event)} // update state on change
            />
          </form>
        </div>

        <div className="row justify-content-center">
          <button
            className="col-md-3 mx-md-2 mt-2 btn btn-success"
            onClick={event => props.onUserInfoUpdate(event)}>
            Save
          </button>

          <Link
            className="col-md-3 mx-md-2 mt-2 btn btn-warning"
            to={`/profile/changepassword`}>
            Change Password
          </Link>
        </div>

        <div className="row justify-content-sm-center">
          <Link className="col-md-3 mx-md-2 mt-2 btn btn-primary" to={`/profile`}>
            Return to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditView;
