import React from 'react';
import NavBar from '../components/nav_bar.js';
import { Link } from 'react-router-dom';

const ProfileEditView = (props) => {
  return (
    <div>
        <NavBar />
        <div>
          <div className="justify-content-sm-center row">
            <b>Change name to:</b>
          </div>
          <div className="justify-content-sm-center row">
            <form className="col-sm-8" onSubmit={(event) => props.onUserInfoUpdate(event)}>
              <input
                className="todoItem list-group-item col-sm-12"
                type="text"
                value={props.nameInputValue}
                onChange={(event) => props.onNameChange(event)} // update state on change
              />
            </form>
          </div>
          <div className="justify-content-sm-center row">
            <b>Change email to:</b>
          </div>
          <div className=" justify-content-sm-center row">
            <form className="col-sm-8" onSubmit={(event) => props.onUserInfoUpdate(event)}>
              <input
                className="todoItem list-group-item col-sm-12"
                type="email"
                value={props.emailInputValue}
                onChange={(event) => props.onEmailChange(event)} // update state on change
              />
            </form>
          </div>
          <div className="row justify-content-sm-center">
            <button
              className="col-sm-2 btn btn-item btn-success"
              onClick={(event) => props.onUserInfoUpdate(event)}>
              Save
            </button>
            <Link
            className="col-sm-2 btn btn-item btn-warning"
            to={`/profile/changepassword`}>
              Change Password            
            </Link>          
          </div>
          <div className="row justify-content-sm-center">
            <Link className="col-sm-2 btn btn-item btn-primary" to={`/profile`}>
              Return to Profile
            </Link>
          </div>
        </div>
      </div>
  );
};

export default ProfileEditView;
