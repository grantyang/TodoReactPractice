import React from 'react';
import { Link } from 'react-router-dom'; 

const About = (props) => {

    return (
        <div>
            <h1>About Us</h1>

            <span>This todo app was created by <b>Grant Yang</b></span>
            <p>Contact me at grantyang1@gmail.com </p>
            <Link className= "btn btn-primary" to="/"> Return Home </Link>
        </div>
    );
}

export default About;