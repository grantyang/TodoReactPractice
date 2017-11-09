import React from 'react';
import NavBar from '../containers/nav_bar.js';
import pusheen from '../pusheen.jpg';

const About = props => {
  return (
    <div>
      <NavBar />
      <div className="row justify-content-center mt-4">
        <span>
          This todo app was created by <b>Grant Yang</b>
        </span>
      </div>
      <div className="row justify-content-center">
        <span>Please contact me at grantyang1@gmail.com. Thank you!</span>
      </div>
      <div className="row justify-content-center mt-4">
        <img className="pusheen rounded" src={pusheen} alt={'me_irl'} />
      </div>
    </div>
  );
};

export default About;
