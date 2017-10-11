import React, { Component } from 'react';
import NavBar from './nav_bar.js';
import Input from '../components/input.js';
import { Link } from 'react-router-dom';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div>
          <div className="justify-content-sm-center row">
            <b>Change name to:</b>
          </div>
          <div className="justify-content-sm-center">
            <Input fxToRun={this.props.changeName} />
          </div>
          <div className="justify-content-sm-center row">
            <b>Change email to:</b>
          </div>
          <div className=" justify-content-sm-center">
            <Input fxToRun={this.props.changeEmail} />
          </div>
          <div className="row justify-content-sm-center">
            <button className="btn btn-item col-md-2 col-md-offset-5 btn-danger">
              Delete
            </button>
            <Link
              className="col-md-2 col-md-offset-5 btn btn-item btn-primary"
              to={`/profile`}>
              Return to Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileEdit;
