import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import Input from './input.js';
import TodoList from './todo_list.js';
import Footer from './footer.js';
import SearchBar from './search_bar.js';
import { Link } from 'react-router-dom';

class List extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			todoList: [],
			filter: 'ALL',
			searchTerm: '',
			loading: true
		};
	}

	componentDidMount() {
		const listName = this.props.match.params.listName;
		fetch(`http://localhost:5000/list/${listName}`, {
			method: 'GET'
		})
			.then(res => {
				return res.json();
			})
			.then(returnedList => {
				this.setState({
					name: returnedList.name,
					todoList: returnedList.todoList, // load in initial list from server
					loading: false
				});
			});
	}
	// setTimeout(function(){
	//     res.json(updatedTodo)

	// },1000)

	addToList = todoText => {
		//fat arrow function instead of binding separately
		if (!todoText) {
			alert('Please input a value');
		} else if (this.state.todoList.find(item => item.text === todoText)) {
			//if there is a duplicate
			alert('Todo item already exists');
		} else if (todoText) {
			const todoObj = {
				text: todoText,
				completed: false,
				editMode: false,
				saving: false
			};
			const listName = this.props.match.params.listName;
			fetch(`http://localhost:5000/list/${listName}`, {
				method: 'POST',
				body: JSON.stringify(todoObj),
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
						todoList: [newTodo, ...this.state.todoList] // add new Object to todoList
					});
				});
		}
	};

	clearAll = () => {
		//clear all todo items from this list
		const listName = this.props.match.params.listName;
		fetch(
			`http://localhost:5000/list/${listName}?all=true`, 
			{ method: 'DELETE' }
		)
			.then(() => {
				this.setState({
					todoList: []
				});
			})
			.catch(error => {
				return error;
			});
	};

	clearComplete = () => {
		//clear completed todo items from this list
		const listName = this.props.match.params.listName;
		fetch(`http://localhost:5000/list/${listName}?completed=true`, {
			method: 'DELETE'
		})
			.then(() => {
				const newList = this.state.todoList.filter(
					item => item.completed === false
				);
				this.setState({ todoList: newList });
			})
			.catch(error => {
				return error;
			});
	};

	countCompleted = () => {
		//count number of tood items not yet completed in this list
		let total = 0;
		this.state.todoList.forEach(element => {
			if (element.completed === false) {
				total++;
			}
		});
		return total;
	};

	showAll = () => {
		//show all items regardless of completed status
		this.setState({ filter: 'ALL' });
	};

	showCompleted = () => {
		//show only completed items
		this.setState({ filter: 'COMPLETED' });
	};

	showActive = () => {
		//show only active items
		this.setState({ filter: 'ACTIVE' });
	};

	applyCompletedFilter = (todos) => {
		//return list of items based on filter
		return todos.filter(todo => {
			if (this.state.filter === 'COMPLETED') return todo.completed;
			if (this.state.filter === 'ACTIVE') return !todo.completed;
			return todo; //else ALL
			
		});
	};

	setSearchTerm = searchTerm => {
		//sets the search term when input is changed
		this.setState({ searchTerm });
	};

	searchResults = () => {
		//searches for searchterm 
		return this.state.todoList.filter(todo => {
			if (this.state.searchTerm === '') return todo;
			if (todo.text.toLowerCase().includes(this.state.searchTerm.toLowerCase())) return todo;
		});
	};

	//get visible todos, then filter further based on search term. return that in TodoList instead.
	//if searchTerm is part of any todo.text, show the todo.text, otherwise no show
	//reset searchTerm with button?

	render() {
		const name = this.state.name;
		const filteredTodos = this.applyCompletedFilter(this.searchResults());

		return (
			<div className="List">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2 className="Header-text">{name}</h2>
				</div>
				<div className="container">
					<SearchBar
						setSearchTerm={this.setSearchTerm}
						term={this.state.searchTerm}
					/>
					<Input fxToRun={this.addToList} /*pass addToList as prop*/ />
					<TodoList
						className=""
						listName={name}
						todoList={filteredTodos}
						loading={this.state.loading}
					/>
					<Footer
						className="list-group"
						clear={this.clearAll}
						clearComplete={this.clearComplete}
						showAll={this.showAll}
						showCompleted={this.showCompleted}
						showActive={this.showActive}
						countCompleted={this.countCompleted}
					/>
					<div className="row justify-content-sm-center">
						<Link
							className="btn col-sm-4 btn-item btn-warning"
							to={`/list/edit/${name}`}>
							Edit List
						</Link>
					</div>
					<div className="row justify-content-sm-center">
						<Link className="btn col-sm-4 btn-item btn-primary " to="/">
							Return Home
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

export default List;
