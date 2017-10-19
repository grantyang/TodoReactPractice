import React from 'react';
import NavBar from '../components/nav_bar.js';

const About = props => {
  return (
    <div>
      <NavBar/>
      <div className="row justify-content-sm-center mt-2">
        <span>
          This todo app was created by <b>Grant Yang</b>
        </span>
      </div>
      <div className="row justify-content-sm-center">
        <span>Please contact me at grantyang1@gmail.com. Thank you!</span>
      </div>
      <div className="row justify-content-sm-center">
        <h1>pic goes here</h1>
      </div>

    </div>
  );
};

export default About;
