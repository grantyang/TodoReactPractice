import React from 'react';
import { Link } from 'react-router-dom';

const About = props => {
  return (
    <div>
      <div className="row justify-content-sm-center">
        <h1>About Us</h1>
      </div>
      <div className="row justify-content-sm-center">
        <span>
          This todo app was created by <b>Grant Yang</b>
        </span>
      </div>
      <div className="row justify-content-sm-center">
        <span>Please contact me at grantyang1@gmail.com. Thank you!</span>
      </div>
      <div className="row justify-content-sm-center">
        <Link className="btn btn-item btn-primary" to="/">
          {' '}
          Return Home{' '}
        </Link>
      </div>
    </div>
  );
};

export default About;
