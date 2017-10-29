import React from 'react';
import NavBar from '../containers/nav_bar.js';
import { Link } from 'react-router-dom';

const ChangePasswordView = props => {
  return (
    <div>
      <NavBar />
      <div className="container mt-2">
        <form className="col-md-8">
          <div className="form-group">
            <b>Current Password:</b>
            <input
              className="todoItem list-group-item col-md-12"
              type="password"
              value={props.oldPasswordInput}
              onChange={props.onOldPasswordChange} // update state on change
            />
          </div>
          <div className="form-group">
            <b>New Password:</b>
            <input
              className="todoItem list-group-item col-md-12"
              type="password"
              value={props.newPasswordInput}
              onChange={props.onNewPasswordChange} // update state on change
              onSubmit={props.saveNewPassword}
            />
          </div>
          <button
            type="submit"
            className="col-md-4 btn btn-item btn-success"
            onClick={props.saveNewPassword}>
            Save
          </button>
          <Link className="col-md-4 btn btn-item btn-warning" to={`/profile`}>
            Return to Profile
          </Link>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordView;
