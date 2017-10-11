import React, { Component } from 'react';
import NavBar from './nav_bar.js';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state ={
      name: '',
      email: ''
    };
  }

  //I am logged in, so i have a cookie with authId
  //I send the server authId in the cookie when i want data
  //Server checks to see if authId matches a current session (middleware?)
  //If the authId i sent matches a session, server sends me data.
  //If no match, send error status code.
  
  componentDidMount() {

    fetch(`http://localhost:5000/profile/`, {
			method: 'GET',
			    credentials: 'include'
		})
			.then(res => {
        if (res.status === 403) return alert('Please Log In')                      
        if (res.status === 401) return alert('Invalid Token')              
				return res.json();
			})
			.then(returnedUser => {
        if (returnedUser){
          this.setState({
            name: returnedUser.name,
            email: returnedUser.email
          });
        }
			});
	}

  render() {
    return (
      <div>
        <NavBar/>
        <div className="container mt-2">
          <div className="justify-content-sm-left row">
            <span>{this.state.name}</span>
          </div>
          <div className="justify-content-sm-left row">
            <span>{this.state.email}</span>
          </div>
          <div className="row">
            <Link
              className="col-sm-2 btn btn-item btn-warning"
              to={`/profile/edit`}>
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
