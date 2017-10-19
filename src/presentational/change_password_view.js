import React from 'react';
import NavBar from '../components/nav_bar.js';
import { Link } from 'react-router-dom';

const ChangePasswordView = props => {
  return (
    <div>
      <NavBar />
      <div className="container mt-2">
        <div className="justify-content-sm-center row">
          <b>Current Password:</b>
        </div>
        <div className=" justify-content-sm-center row">
          <form className="col-sm-8" onSubmit={props.saveNewPassword}>
            <input
              className="todoItem list-group-item col-sm-12"
              type="password"
              value={props.oldPasswordInput}
              onChange={event =>
                props.onOldPasswordChange(event)} // update state on change
            />
          </form>
        </div>
        <div className="justify-content-sm-center row">
          <b>New Password:</b>
        </div>
        <div className=" justify-content-sm-center row">
          <form className="col-sm-8" onSubmit={props.saveNewPassword}>
            <input
              className="todoItem list-group-item col-sm-12"
              type="password"
              value={props.newPasswordInput}
              onChange={event =>
                props.onNewPasswordChange(event)} // update state on change
              onSubmit={event => props.saveNewPassword(event)}
            />
          </form>
        </div>
        <div className="row justify-content-sm-center">
          <button
            className="col-sm-2 btn btn-item btn-success"
            onClick={props.saveNewPassword}>
            Save
          </button>
          <Link className="col-sm-2 btn btn-item btn-warning" to={`/profile`}>
            Return to Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordView;
