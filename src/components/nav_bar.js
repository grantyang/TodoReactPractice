import React, { Component } from 'react';
import NavBarView from '../presentational/nav_bar_view.js';
import {callJSON} from '../ajax_utility.js';
import { loadCurrentUser} from '../actions/index.js';
import store from '../redux_create_store.js';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSession: false
    };
  }

  componentWillMount() {
    store.dispatch(loadCurrentUser());
  }

  componentDidMount() {
    this.unsubscribe = store.subscribe(this.updateComponentState);
  }

  updateComponentState = () => {
    return this.setState({
      activeSession: store.getState().user.meta.activeSession,
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
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
