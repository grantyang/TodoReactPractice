import React, { Component } from 'react';
import ProfileEditView from '../presentational/profile_edit_view.js';
import { loadCurrentUser, updateUserProfile,uploadPhoto } from '../actions/index.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameInputValue: this.props.initialNameInputValue,
      emailInputValue: this.props.initialEmailInputValue,
      fileInput: ''
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
      emailInputValue: nextProps.initialEmailInputValue
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

  onFileChange = event => {
    event.preventDefault();
    // when file is changed, update state
    this.setState({
      fileInput: event.target.files
    });
  };

  onFileSubmit = event => {
    event.preventDefault();
    if (this.state.fileInput === '') return alert('Please select a photo.');
    let formData = new FormData();
    formData.append('photo', this.state.fileInput[0]);
    formData.append('name', this.state.fileInput[0].name);

    this.props.uploadPhoto(formData, 'profile');

    this.setState({
      fileInput: ''
    });
    
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
        onFileChange={this.onFileChange}
        onFileSubmit={this.onFileSubmit}
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
      updateUserProfile: updateUserProfile,
      uploadPhoto: uploadPhoto
    },
    dispatch
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
