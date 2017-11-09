import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { loadCurrentUser } from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
class PrivateRoute extends Component {
  componentDidMount() {
    this.props.loadCurrentUser();
  }

  //https://github.com/ReactTraining/react-router/issues/4105
  privateRoute = ({ component: Component, ...rest }) => {
    if (this.props.activeSession) {
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
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
