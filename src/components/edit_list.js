import React, { Component } from 'react';
import '../App.css';
import EditListView from '../presentational/edit_list_view';

export default class EditList extends Component {
  componentDidMount() {
    fetch(`http://localhost:5000/list/${this.getListName()}`, {
      method: 'GET'
    })
      .then(res => {
        return res.json();
      })
      .then(returnedList => {
        this.setState({
          loading: false
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
			loading: true,
			saving: false
    };
  }

  getListName = () => {
    return this.props.match.params.listName;
  };

  changeName = name => {
		//change name of this list
		this.setState({
			saving: true
		})
    fetch(`http://localhost:5000/list/${this.getListName()}`, {
      method: 'PUT',
      body: JSON.stringify({ name }),
      headers: {
        Accept: 'application/json', // this is what i expect to recive from the server
        'Content-Type': 'application/json' // This is what i am sending to the server
      }
    })
      .then(res => {
        return res.json();
      })
      .then(() => {
				this.setState({
					saving: false
				})
        this.props.history.push(`${name}`);
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
        getListName={this.getListName}
        changeName={this.changeName}
        delete={this.delete}
      />
    );
  }
}
