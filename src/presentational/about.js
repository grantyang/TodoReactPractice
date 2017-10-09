import React from 'react';
import { Link } from 'react-router-dom';
import GoogleMap from '../components/google_map'
import NavBar from './nav_bar.js';

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

      <GoogleMap  />
      </div>

    </div>
  );
};

export default About;
