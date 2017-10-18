import React, { Component } from 'react';
import '../App.css';
import EditListView from '../presentational/edit_list_view';

export default class EditList extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/list/${this.getListName()}`, {
			method: 'GET',
			credentials: 'include'
    })
      .then(res => {
        return res.json();
      })
      .then(returnedList => {
        this.setState({
					loading: false,
					privacyInput: returnedList.privacy,
					textInputValue: returnedList.name
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
			loading: true,
			saving: false,
			privacyInput: 'private',
			textInputValue: ''
    };
  }

  getListName = () => {
    return this.props.match.params.listName;
  };



	onSave = () => {
    // when input is submitted, add to database
    const newText = this.state.textInputValue;
		const newPrivacy = this.state.privacyInput;
		console.log(`privacy input is : ${newPrivacy}`)
    this.setState({
      saving: true
    });
    fetch(
      `http://localhost:5000/list/${this.getListName()}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          name: newText,
          privacy: newPrivacy
        }),
        credentials: 'include',
        headers: {
          Accept: 'application/json', // this is what i expect to receive from the server
          'Content-Type': 'application/json' // This is what i am sending to the server
        }
      }
    )
      .then(res => {
        return res.json();
      })
      .then(() => {
        this.setState({
          saving: false
        });
        this.props.history.push(`${newText}`);
      });
	};
	
	onPrivacyChange = event => {
    //when Privacy is changed, update state
    this.setState({
      privacyInput: event.target.value
    });
	};

	onTextChange = event => {
    // when input is changed, update state
    this.setState({
      textInputValue: event.target.value
    });
  };
	

  delete = () => {
    //delete this list and return to homepage
    fetch(`http://localhost:5000/list/${this.getListName()}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.props.history.push('');
      })
      .catch(error => {
        return error;
      });
  };

  render() {
    if (this.state.loading === true) {
      return <b>Please wait, loading...</b>;
		} 
		if (this.state.saving === true) {
      return <b>Please wait, saving...</b>;
    }
    return (
      <EditListView
			  onSave={this.onSave}
				onTextChange={this.onTextChange}
        textInputValue={this.state.textInputValue}

			  privacyInput={this.state.privacyInput}
        getListName={this.getListName}
        changeName={this.changeName}
        delete={this.delete}
				onPrivacyChange={this.onPrivacyChange}

      />
    );
  }
}
