import React, { Component } from 'react';
import ProfileView from '../presentational/profile_view.js';
import { callJSON } from '../ajax_utility.js';
import { loadCurrentUser } from '../actions/index.js';
import { connect } from 'react-redux';
import store from '../redux_create_store.js';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      loading: true
    };
  }

  componentWillMount() {
    store.dispatch(loadCurrentUser());
  }

  componentDidMount() {
    this.updateComponentState(); //keep in sync with redux
    this.unsubscribe = store.subscribe(this.updateComponentState);
  }

  updateComponentState = () => {
    return this.setState({
      name: this.props.name,
      email: this.props.email,
      loading: this.props.loading
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }


  render() {
    if (this.state.loading === true) {
      return <b>Please wait, loading...</b>;
    }
    return <ProfileView name={this.state.name} email={this.state.email} />;
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of this component
  return {
    name: state.user.model.name,
    email: state.user.model.email,
    loading: state.user.meta.loading
  };
}

export default connect(mapStateToProps)(ProfileView);

