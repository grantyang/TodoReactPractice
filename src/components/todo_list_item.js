import React, { Component } from 'react';
import TodoListItemView from '../presentational/todo_list_item_view';
import {callJSON} from '../ajax_utility.js';

class TodoListItem extends Component {
  componentDidMount() {
    const itemId = this.props.match.params.itemId;
    callJSON('GET', `list/${this.getListName()}/todo/${itemId}`)
      .then(res => {
        return res.json();
      })
      .then(returnedItem => {
        this.setState({
					todo: returnedItem, // load in todo from server
					location: returnedItem.location,					
					loading: false
          //get location data from server
          //search enabled, click map to set location, click to clear location
        });
      });
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      todo: {}
    };
  }

  getListName = () => {
    return this.props.match.params.listName;
  };

  toggleCompleted = todo => {
    callJSON('PUT', `list/${this.getListName()}/todo/${todo.id}`,{completed: !todo.completed })
      .then(res => {
        return res.json();
      })
      .then(newTodo => {
        this.setState({
          todo: {
            ...todo,
            completed: !todo.completed
          }
        });
      });
  };

  delete = () => {
    callJSON('DELETE', `list/${this.getListName()}/todo/${this.state.todo.id}`)
      .then(() => {
        this.props.history.push(`/list/${this.getListName()}`);
      })
      .catch(error => {
        return error;
      });
  };

  saveLocation = location => {
    callJSON('PUT', `list/${this.getListName()}/todo/${this.state.todo.id}`,{location: location})
      .then(res => {
        return res.json();
      })
      .then(newTodo => {
        this.setState({
          todo: {
            ...this.state.todo,
            location: location
          }
        });
      });
  };

  render() {
    if (this.state.loading === true) return <b>Please wait, loading...</b>;
    return (
      <TodoListItemView
        todo={this.state.todo}
        listName={this.props.match.params.listName}
        toggleCompleted={this.toggleCompleted}
        delete={this.delete}
        getListName={this.getListName}
        location={this.state.location}
        saveLocation={this.saveLocation}
      />
    );
  }
}

export default TodoListItem;
