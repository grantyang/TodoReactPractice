import React, { Component } from 'react';
import TodoListItemView from './todo_list_item_view';
import TodoListItemEdit from './todo_list_item_edit';

class TodoListItem extends Component {
	componentDidMount() {
		const itemId = this.props.match.params.itemId;
		fetch(`http://localhost:5000/list/${this.getListName()}/${itemId}`, {
			method: 'GET'
		})
			.then(res => {
				return res.json();
			})
			.then(returnedItem => {
				this.setState({
					todo: returnedItem, // load in initial list from server
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
			todo: {}
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
		// when input is submitted, add to App state
		event.preventDefault();
		this.save(this.state.todo, this.state.initialTextInputValue);
	};

	editMode = todo => {
		this.setState({
			todo: {
				...todo,
				editMode: true
			}
		});
	};

	save = (todo, newText) => {
		this.setState({
			todo: {
				...todo,
				saving: true
			}
		});
		fetch(`http://localhost:5000/list/${this.getListName()}/${todo.id}`, {
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
					todo: {
						...todo,
						text: newText,
						editMode: false,
						saving: false
					}
				});
			});
	};

	toggleCompleted = todo => {
		fetch(`http://localhost:5000/list/${this.getListName()}/${todo.id}`, {
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

	delete = todo => {
		console.log(this.getListName());
		fetch(`http://localhost:5000/list/${this.getListName()}/${todo.id}`, {
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
		if (this.state.loading === true) {
			return <b>Please wait, loading...</b>;
		} else if (this.state.todo.saving === true) {
			return <b>Please wait, saving...</b>;
		} else if (this.state.todo.editMode === false) { 
			return  <TodoListItemView
									todo={this.state.todo}
									listName={this.props.match.params.listName}
									editMode={this.editMode}
									toggleCompleted={this.toggleCompleted}
									delete={this.delete}
									getListName={this.getListName}
									/>;
		}
		return <TodoListItemEdit
									onEditSubmit={this.onEditSubmit}
									onEditChange={this.onEditChange}
									initialTextInputValue={this.state.initialTextInputValue}
									delete={this.delete}
									todo={this.state.todo}
									/>;
	}
}

export default TodoListItem;
