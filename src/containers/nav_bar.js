import React, { Component } from 'react';
import NavBarView from '../presentational/nav_bar_view.js';
import {callJSON} from '../ajax_utility.js';
import { loadCurrentUser} from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class NavBar extends Component {

  componentWillMount() {
    this.props.loadCurrentUser();
  }

  deleteCookie = () => {
    document.cookie = 'userToken=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  };

  render() {
    return (
      <NavBarView
        activeSession={this.props.activeSession}
        deleteCookie={this.deleteCookie}
      />
    );
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of the component
  return {
    activeSession: state.user.meta.activeSession
  };
}

function mapDispatchToProps(dispatch) {
  //Whatever is returned will show up as props inside of the component
  return bindActionCreators(
    {
      loadCurrentUser: loadCurrentUser
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
