import React from 'react';
import { Link } from 'react-router-dom'; 

const About = (props) => {

    return (
        <div className='col-md-4 col-md-offset-4 text-center'>
            <h1>About Us</h1>
            <span>This todo app was created by <b>Grant Yang</b></span>
            <br/>
            <span>Please contact me at grantyang1@gmail.com. Thank you!</span>
            <br/>
            <Link className= "btn btn-item btn-primary" to="/"> Return Home </Link>
        </div>
    );
}

export default About;