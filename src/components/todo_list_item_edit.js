import React, { Component } from 'react';
import TodoListItemEditView from './todo_list_item_edit_view';

//no more passing prop from last page.
export default class TodoListItemEdit extends Component {
  componentDidMount() {
    const itemId = this.props.match.params.itemId;
    fetch(`http://localhost:5000/list/${this.getListName()}/todo/${itemId}`, {
      method: 'GET'
    })
      .then(res => {
        return res.json();
      })
      .then(returnedItem => {
        this.setState({
          todoId: returnedItem.id, // load in initial list from server
          initialTextInputValue: returnedItem.text,
          loading: false
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      initialTextInputValue: '',
      loading: true,
      saving: false,
      todoId: ''
    };
  }

  getListName = () => {
    return this.props.match.params.listName;
  };

  onEditChange = event => {
    // when input is changed, update state
    this.setState({ initialTextInputValue: event.target.value });
  };

  onEditSubmit = event => {
    // when input is submitted, add to database
    event.preventDefault();
    this.save(this.state.initialTextInputValue);
  };

  save = (newText) => {
    this.setState({
      saving: true
    });
    fetch(`http://localhost:5000/list/${this.getListName()}/todo/${this.state.todoId}`, {
      method: 'PUT',
      body: JSON.stringify({ text: newText }),
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
        });
        this.props.history.push(`/list/${this.getListName()}/todo/${this.state.todoId}`);
      });
  };

  delete = event => {
    event.preventDefault();    
    fetch(`http://localhost:5000/list/${this.getListName()}/todo/${this.state.todoId}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.props.history.push(`/list/${this.getListName()}`);
      })
      .catch(error => {
        return error;
      });
  };

  render() {
    if (this.state.loading === true) {
      return <b>Please wait, loading...</b>;
    } else if (this.state.saving === true) {
      return <b>Please wait, saving...</b>;
    }
    return (
      <TodoListItemEditView
        initialTextInputValue={this.state.initialTextInputValue}
        onEditChange={this.onEditChange}
        onEditSubmit={this.onEditSubmit}
        delete={this.delete}
      />
    );
  }
}
