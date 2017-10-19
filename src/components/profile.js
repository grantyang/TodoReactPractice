import React, { Component } from 'react';
import ProfileView from '../presentational/profile_view.js';

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
    return <ProfileView name={this.state.name} email={this.state.email} />;
  }
}

export default Profile;
