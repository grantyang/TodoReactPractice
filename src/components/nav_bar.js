import React, { Component } from 'react';
import NavBarView from '../presentational/nav_bar_view.js';
import {callJSON} from '../ajax_utility.js';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSession: false
    };
  }
  //if user's cookie is correct, show
  componentDidMount() {
    callJSON('GET', 'user')
      .then(res => {
        if (res.status === 403) {
          this.setState({
            activeSession: false
          });
          return null
        }
        return res.json();
      })
      .then(user => {
        if (user) {
          this.setState({
            activeSession: true
          });
        }
      });
  }

  deleteCookie = () => {
    document.cookie = 'userToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  render() {
    return (
      <NavBarView
        activeSession={this.state.activeSession}
        deleteCookie={this.deleteCookie}
      />
    );
  }
}
export default NavBar;
