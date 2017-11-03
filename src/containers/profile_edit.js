import React, { Component } from 'react';
import ProfileEditView from '../presentational/profile_edit_view.js';
import { callJSON } from '../ajax_utility.js';
import { loadCurrentUser, updateUserProfile } from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInputValue: this.props.initialNameInputValue, 
      emailInputValue: this.props.initialEmailInputValue
    };
  }

  componentDidMount() {
    this.props.loadCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.updating && nextProps.updating === false) {
      return this.props.history.push(`/profile`); //redirect back to profile
    }
    return this.setState({
      nameInputValue: nextProps.initialNameInputValue,
      emailInputValue: nextProps.initialEmailInputValue,
    });
  }

  onUserInfoUpdate = event => {
    event.preventDefault();
    // when input is submitted, add to database
    const newName = this.state.nameInputValue;
    const newEmail = this.state.emailInputValue;
    if (!newName) {
      return alert('Please input a name');
    }
    if (!newEmail) {
      return alert('Please input an email');
    }
    const newUser = {
      name: newName,
      email: newEmail
    };
    this.props.updateUserProfile(newUser);
    return this.props.history.push(`/profile`);
  };

  onNameChange = event => {
    return this.setState({ nameInputValue: event.target.value });
  };

  onEmailChange = event => {
    return this.setState({ emailInputValue: event.target.value });
  };

  render() {
    return (
      <ProfileEditView
        loading={this.props.loading}
        updating={this.props.updating}
        onUserInfoUpdate={this.onUserInfoUpdate}
        onNameChange={this.onNameChange}
        onEmailChange={this.onEmailChange}
        nameInputValue={this.state.nameInputValue}
        emailInputValue={this.state.emailInputValue}
      />
    );
  }
}

function mapStateToProps(state) {
  //Whatever is returned will show up as props inside of the component
  return {
    initialNameInputValue: state.user.model.name,
    initialEmailInputValue: state.user.model.email,
    loading: state.user.meta.loading,
    updating: state.user.meta.updating
  };
}

function mapDispatchToProps(dispatch) {
  //Whatever is returned will show up as props inside of the component
  return bindActionCreators(
    {
      loadCurrentUser: loadCurrentUser,
      updateUserProfile:updateUserProfile,
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
