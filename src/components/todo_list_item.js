import React, { Component } from 'react';
import TodoListItemView from '../presentational/todo_list_item_view';

class TodoListItem extends Component {
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
          todo: returnedItem, // load in initial list from server
          loading: false
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
    fetch(`http://localhost:5000/list/${this.getListName()}/todo/${todo.id}`, {
      method: 'PUT',
      body: JSON.stringify({ completed: !todo.completed }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
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
		fetch(`http://localhost:5000/list/${this.getListName()}/todo/${this.state.todo.id}`, {
			method: 'DELETE'
		})
			.then(() => {
				this.props.history.push(`/list/${this.getListName()}`)								
			})
			.catch(error => {
				return error;
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
      />
    );
  }
}

export default TodoListItem;
