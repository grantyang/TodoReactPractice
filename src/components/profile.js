import React, { Component } from 'react';
import NavBar from './nav_bar.js';
import { Link } from 'react-router-dom';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loading: true
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/user/`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 403) return alert('Please Log In');
        if (res.status === 401) return alert('Invalid Token');
        return res.json();
      })
      .then(returnedUser => {
        if (returnedUser) {
          this.setState({
            name: returnedUser.name,
            email: returnedUser.email,
            loading: false
          });
        }
      });
  }

  render() {
    if (this.state.loading === true) {
      return <b>Please wait, loading...</b>;
    }
    return (
      <div>
        <NavBar />
        <div className="container mt-2">
          <div className="justify-content-sm-left row mt-2 ">
            <h6>Name</h6>
          </div>

          <div className="justify-content-sm-left row"> 
            <span className="col-sm-4 list-group-item">{this.state.name}</span>
          </div>
          <div className="justify-content-sm-left row mt-2">
            <h6>Email</h6>
          </div>

          <div className="justify-content-sm-left row">
            <span className="col-sm-4 list-group-item" >{this.state.email}</span>
          </div>
          <div className="justify-content-sm-left row">
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
