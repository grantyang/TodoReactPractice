import React, { Component } from 'react';
import { callJSON } from '../ajax_utility.js';
import { Route, Redirect } from 'react-router-dom';
import { loadCurrentUser } from '../actions/index.js';
import store from '../redux_create_store.js';

export default class PrivateRoute extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      activeSession: true
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
      activeSession: store.getState().user.meta.activeSession
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  //https://github.com/ReactTraining/react-router/issues/4105
  privateRoute = ({ component: Component, ...rest }) => {
    if (this.state.activeSession) {
      return (
        <Route
          {...rest}
          render={props => <Component {...props} store={this.props.store} />}
        />
      );
    } else {     
      return (
        <Route
          {...rest}
          render={props => <Redirect to={{ pathname: '/login' }} />}
        />
      );
    }
  };

  render() {
    const newRoute = this.privateRoute(this.props);
    return newRoute;
  }
}
